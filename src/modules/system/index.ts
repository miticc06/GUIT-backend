import { Module } from '@nestjs/common'

import { SystemResolvers } from './system.resolver'

@Module({ providers: [SystemResolvers] })
export class SystemModule {}
