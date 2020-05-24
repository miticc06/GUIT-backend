import { Resolver } from '@nestjs/graphql'
import { UseInterceptors } from '@nestjs/common'
import { Logging } from '@interceptors'
import { ResolverClass } from '@utils'
import { _appConfigs } from '@constants'

@Resolver('Setting')
@UseInterceptors(Logging)
export class SettingResolvers extends ResolverClass {}
