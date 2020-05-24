import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import envConfig from '@src/env.config'

@Module({ imports: [TypeOrmModule.forRoot(envConfig.ormConfig)] })
export class TypemORMModule {}
