import { Module } from '@nestjs/common'

import { SettingResolvers } from './setting.resolver'

@Module({ providers: [SettingResolvers] })
export class SettingModule {}
