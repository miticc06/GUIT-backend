import { Resolver } from '@nestjs/graphql'
import { UseInterceptors } from '@nestjs/common'

import { _appConfigs } from '@constants'
import { Logging } from '@interceptors'
import { ResolverClass } from '@utils'

@Resolver('Permission')
@UseInterceptors(Logging)
export class PermissionResolvers extends ResolverClass {}
