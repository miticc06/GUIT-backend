import { Module } from '@nestjs/common'
import { RoleResolvers } from './role.resolver'

@Module({ providers: [RoleResolvers] })
export class RoleModule {}
