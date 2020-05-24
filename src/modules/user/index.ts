import { Module } from '@nestjs/common'
import { UserResolvers } from './user.resolver'

@Module({ providers: [UserResolvers] })
export class UserModule {}
