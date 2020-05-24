import { Module } from '@nestjs/common'

import { PermissionResolvers } from './permission.resolver'

@Module({ providers: [PermissionResolvers] })
export class PermissionModule {}
