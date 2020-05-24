import { Resolver } from '@nestjs/graphql'
import { UseInterceptors } from '@nestjs/common'
import { Logging } from '@interceptors'

import { ResolverClass } from '@utils'
import { _appConfigs, _logic } from '@constants'

const addslashes = (str) => `${str}`.replace(/[\\"'\(\)\[\]]/g, '\\$&').replace(/\u0000/g, '\\0')

@Resolver('User')
@UseInterceptors(Logging)
export class UserResolvers extends ResolverClass {}
