import { Module } from '@nestjs/common'
import { getMongoManager } from 'typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import * as depthLimit from 'graphql-depth-limit'
import { _appConfigs } from '@constants'
import { Console, extractIdFromToken } from '@utils'
import { User } from '@entities'
import { SContext, IContext } from './_types'
import { DeprecatedDirective } from './directives'
import { generatorConfigs } from './settings'
import { decode } from 'jsonwebtoken'
const { GRAPHQL_PATH, GRAPHQL_DEPTH_LIMIT, TOKEN } = _appConfigs

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        // NOTE: Load graphql files
        path: GRAPHQL_PATH,
        typePaths: ['./**/*.graphql'],

        // NOTE: Subscriptions
        installSubscriptionHandlers: true,
        subscriptions: {
          keepAlive: 10000,
          path: GRAPHQL_PATH,
          onConnect: async (connectionParams) => {
            if (connectionParams[TOKEN]) {
              const currentUserId = extractIdFromToken(connectionParams[TOKEN])
              if (currentUserId) {
                const currentUser = await getMongoManager().findOne(User, {
                  where: { _id: currentUserId },
                  select: ['_id', 'username']
                })

                if (currentUser) {
                  return {
                    currentUserId,
                    username: currentUser.username
                  }
                }
              } else {
                throw new Error('Missing or invalid auth token!')
              }
            }
            return null
          },
          onDisconnect: async (_webSocket, context) => {}
        },

        // NOTE: Graphql schema definitions generator
        ...((process.env.GENERATE_SCHEMA || process.env.NODE_ENV === 'production') && {
          definitions: { ...generatorConfigs }
        }),

        // NOTE: Schema directives
        schemaDirectives: {
          deprecated: DeprecatedDirective
        },

        // NOTE: Upload
        uploads: {
          maxFileSize: 10000000, // 10 MB
          maxFiles: 5
        },

        // NOTE: Graphql context
        context: async ({ req, connection }): Promise<SContext | IContext> => {
          // For websocket/subscriptions
          if (connection) {
            if (connection.context.currentUserId) {
              if (connection.variables) {
                return {
                  connection,
                  currentUserId: connection.context.currentUserId,
                  session: connection.context.session,
                  variables: connection.variables
                }
              }
              return {
                connection,
                currentUserId: connection.context.currentUserId
              }
            }
            return { connection }
          } else {
            // For queries/mutations
            if (req.headers[TOKEN]) {
              const { userId }: any = decode(req.headers[TOKEN])

              if (userId) {
                const currentUser = await getMongoManager().findOne(User, {
                  where: { _id: userId },
                  select: ['_id', 'username', 'firstname', 'lastname']
                })
                if (!!currentUser) {
                  return {
                    req,
                    currentUserId: userId,
                    username: currentUser.username,
                    fullName: `${currentUser.firstname} ${currentUser.lastname}`
                  }
                }
              }
            }
            return { req }
          }
        },

        // NOTE: Stop users from making high depth queries/mutations
        validationRules: [
          depthLimit(GRAPHQL_DEPTH_LIMIT, {}, (info) => {
            const [[name, depth]] = Object.entries(info)
            const message = `Queries/Mutations depth reached level ${depth} on ${
              name || '"unknown"'
            }`
            if (depth === GRAPHQL_DEPTH_LIMIT - 1) {
              Console.warn(message)
            } else if (depth === GRAPHQL_DEPTH_LIMIT) {
              Console.error(message)
            }
          })
        ],

        // NOTE: Playground
        introspection: true,
        playground: process.env.NODE_ENV !== 'production' && {
          settings: {
            'general.betaUpdates': false,
            'editor.cursorShape': 'line',
            'editor.fontSize': 14,
            'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Droid Sans Mono', 'Monaco', monospace`,
            'editor.theme': 'dark',
            'editor.reuseHeaders': true,
            'request.credentials': 'omit',
            'tracing.hideTracingResponse': false
          }
        },
        formatError: ({ message, locations, path, extensions: { code } }) => {
          return {
            message: message.toString().replace(/(Error: |Authentication|UserInputError: )+/g, ''),
            locations,
            path,
            code
          }
        }
      })
    })
  ]
})
export class GraphqlModule {}

export * from './_types'
