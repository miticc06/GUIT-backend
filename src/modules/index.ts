import { UserModule } from './user'
import { TypemORMModule } from './typeORM'
import { GraphqlModule } from './graphql'
import { LoggerMiddleware } from '../interceptors/logger.middleware'
import { NestScheduleModule } from './nestSchedule'
import { SystemModule } from './system'
import { PermissionModule } from './permission'
import { SettingModule } from './setting'
import { RoleModule } from './role'

export default [
  LoggerMiddleware,
  GraphqlModule,
  NestScheduleModule,
  TypemORMModule,
  UserModule,
  SystemModule,
  SystemModule,
  SettingModule,
  PermissionModule,
  RoleModule
]
