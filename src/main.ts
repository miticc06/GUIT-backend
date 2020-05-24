import * as env from 'dotenv'
env.config()
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'

import { ApplicationModule } from './app.module'
import chalk from 'chalk'

import { _appConfigs } from '@constants'

declare const module: any

async function bootstrap() {
  const { PORT = _appConfigs.DEFAULT_PORT, NODE_ENV = 'development' } = process.env

  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule)
  if (NODE_ENV === 'development') {
    app.use(_appConfigs.SCHEMA_PATH, voyagerMiddleware({ endpointUrl: _appConfigs.GRAPHQL_PATH }))
  }

  app.enableCors({ origin: '*' })
  await app.listen(PORT)

  // NOTE: HMR
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  console.log(`------- Server ready at port: ${chalk.greenBright(`${PORT}`)} -------`)
}

bootstrap()
