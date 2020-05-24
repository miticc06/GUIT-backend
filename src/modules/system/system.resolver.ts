import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { UseInterceptors } from '@nestjs/common'
import { Logging } from '@interceptors'
import { ResolverClass, IError } from '@utils'
import { _appConfigs } from '@constants'
import { exec } from 'child_process'
import env from '@src/env.config'
import { ApolloError } from 'apollo-server-core'

@Resolver('System')
@UseInterceptors(Logging)
export class SystemResolvers extends ResolverClass {
  @Mutation('restoreDB')
  async restoreDB(@Args('label') label: string): Promise<boolean | IError> {
    try {
      switch (label) {
        case 'Test1': {
          const { port, host, database } = env.ormConfig
          const cmd = `mongorestore --host=${host}:${port} --db ${database} --drop DB/Test1/`
          // TODO: Upgrade restore mongodb cho các server db có password
          exec(cmd, (_error, stdout, _stderr) => {
            console.log(stdout)
          })
          return true
        }
      }
    } catch (error) {
      console.log(error)
      return this.err.Apollo(error)
    }
  }

  @Mutation('backupDB')
  async backupDB(@Args('label') label: string): Promise<boolean | ApolloError> {
    const regex = new RegExp(/^[a-z0-9_]+$/gim)
    if (!regex.test(label)) {
      return new ApolloError('/^[a-z0-9_]+$/gmi')
    }
    console.log(env)
    const { port, host, database } = env.ormConfig
    exec(`mongodump --host=${host}:${port} --db ${database} -o DB/dump_${label}`, () => {
      exec(`mv ./DB/dump_${label}/${database} ./DB/${label}`, () => {
        exec(`rm -rf DB/dump_${label}`)
      })
    })
    console.log(label)
    return true
  }
}
