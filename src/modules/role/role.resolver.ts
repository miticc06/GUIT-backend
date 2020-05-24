import { Resolver } from '@nestjs/graphql'
import { UseInterceptors } from '@nestjs/common'

import { _appConfigs } from '@constants'
import { Logging } from '@interceptors'
import { ResolverClass } from '@utils'

@Resolver('Role')
@UseInterceptors(Logging)
export class RoleResolvers extends ResolverClass {
  // aggregateGetRoles = [
  //   {
  //     $unwind: { path: '$permissions', preserveNullAndEmptyArrays: true }
  //   },
  //   {
  //     $lookup: {
  //       from: 'permissions',
  //       let: {
  //         codePermission: '$permissions'
  //       },
  //       pipeline: [{ $match: { $expr: { $eq: ['$code', '$$codePermission'] } } }],
  //       as: 'permissions'
  //     }
  //   },
  //   {
  //     $unwind: { path: '$permissions', preserveNullAndEmptyArrays: true }
  //   },
  //   {
  //     $group: {
  //       _id: '$_id',
  //       name: { $first: '$name' },
  //       code: { $first: '$code' },
  //       descriptions: { $first: '$descriptions' },
  //       permissions: { $push: '$permissions' },
  //       createdAt: { $first: '$createdAt' },
  //       type: { $first: '$type' }
  //     }
  //   }
  // ]
  // async validateRoleIds(roleIds: Array<string> = []): Promise<boolean> {
  //   const numberOfRolesFound = await this.mongoManager.count(RoleEntity, {
  //     _id: { $in: roleIds }
  //   })
  //   return roleIds.length === numberOfRolesFound
  // }
  // async validatePermissionCodes(permissionCodes: Array<string> = []): Promise<boolean> {
  //   const numberOfPermissionsFound = await this.mongoManager.count(PermissionEntity, {
  //     code: { $in: permissionCodes }
  //   })
  //   return permissionCodes.length === numberOfPermissionsFound
  // }
  // @Query()
  // async roles(
  //   @Args('roleIds') roleIds: Array<string> = [],
  //   @Args('type') type?: EnumTypeRole,
  //   @Args('skip') skip?: number,
  //   @Args('take') take?: number
  // ): Promise<Array<RoleGQLType> | IError> {
  //   try {
  //     const res = await this.mongoManager
  //       .aggregate(RoleEntity, [
  //         ...(roleIds.length
  //           ? [
  //               {
  //                 $match: {
  //                   _id: {
  //                     $in: roleIds
  //                   }
  //                 }
  //               }
  //             ]
  //           : []),
  //         ...this.aggregateGetRoles,
  //         ...(type
  //           ? [
  //               {
  //                 $match: {
  //                   type
  //                 }
  //               }
  //             ]
  //           : []),
  //         {
  //           $sort: {
  //             createdAt: 1
  //           }
  //         },
  //         ...(skip ? [{ $skip: skip }] : []),
  //         ...(take ? [{ $limit: take }] : [])
  //       ])
  //       .toArray()
  //     return res
  //   } catch (error) {
  //     return this.catchErrors(error)
  //   }
  // }
  // @Mutation('createRole')
  // async createRole(
  //   @Context() gqlCtx: IContext,
  //   @Args('input') input: RoleCreateInput
  // ): Promise<boolean | IError> {
  //   try {
  //     if (!gqlCtx.currentUserId) return this.err.Authentication()
  //     const { permissionCodes, name, code, descriptions, type } = input
  //     if (!isValidCode([code])) {
  //       return this.err.UserInput(_code.INVALID_CODE)
  //     }
  //     if (await this.mongoManager.findOne(RoleEntity, { code })) {
  //       return this.err.UserInput(_code.ALREADY_INUSE_CODE)
  //     }
  //     if (!(await this.validatePermissionCodes(permissionCodes))) {
  //       return this.err.UserInput(_code.INVALID_ARRAY_PERMISSION_CODE)
  //     }
  //     return !!(await this.mongoManager.save(
  //       new RoleEntity({
  //         name,
  //         code,
  //         descriptions,
  //         type,
  //         permissions: permissionCodes
  //       })
  //     ))
  //   } catch (error) {
  //     return this.catchErrors(error)
  //   }
  // }
  // @Mutation()
  // async updateRole(
  //   @Context() gqlCtx: IContext,
  //   @Args('roleId') roleId: string,
  //   @Args('input') input: RoleUpdateInput
  // ): Promise<boolean | IError> {
  //   try {
  //     const roleFound = await this.mongoManager.findOne(RoleEntity, { _id: roleId })
  //     if (!roleFound) {
  //       return this.err.UserInput(_code.ROLE_NOT_FOUND)
  //     }
  //     const { permissionCodes, descriptions, name } = input
  //     if (!(await this.validatePermissionCodes(permissionCodes))) {
  //       return this.err.UserInput(_code.INVALID_ARRAY_PERMISSION_CODE)
  //     }
  //     const res = !!(await this.mongoManager.updateOne(
  //       RoleEntity,
  //       { _id: roleFound._id },
  //       {
  //         $set: {
  //           name,
  //           descriptions,
  //           permissions: permissionCodes
  //         }
  //       }
  //     ))
  //     return res
  //   } catch (error) {
  //     return this.catchErrors(error)
  //   }
  // }
  // @Mutation()
  // async deleteRoles(
  //   @Context() gqlCtx: IContext,
  //   @Args('roleIds') roleIds: Array<string>
  // ): Promise<boolean | IError> {
  //   try {
  //     if (!gqlCtx.currentUserId) return this.err.Authentication()
  //     // const existsInUser = await this.mongoManager.findOne(UserRoleEntity, {
  //     //   where: {
  //     //     '_id.roleId': { $in: roleIds }
  //     //   }
  //     // })
  //     // if (existsInUser) {
  //     //   return this.err.Forbidden('You cannot delete role referenced in a user')
  //     // }
  //     if (!(await this.validateRoleIds(roleIds))) {
  //       return this.err.UserInput(_code.INVALID_ARRAY_ROLE_ID)
  //     }
  //     return !!(await this.mongoManager.deleteMany(RoleEntity, {
  //       _id: { $in: roleIds }
  //     }))
  //   } catch (error) {
  //     return this.catchErrors(error)
  //   }
  // }
}
