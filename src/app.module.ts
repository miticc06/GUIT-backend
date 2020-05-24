import { Module, MiddlewareConsumer } from '@nestjs/common'
import Modules from './modules'
import { LoggerMiddleware } from './interceptors/logger.middleware'
import { _appConfigs } from '@constants'

@Module({
  imports: Array.from(Modules)
})
export class ApplicationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
