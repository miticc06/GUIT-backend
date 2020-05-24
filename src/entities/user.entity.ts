import { Entity, Column, ObjectIdColumn } from 'typeorm'

import { dbTableName } from '.'
import { idGenerator } from '@src/utils'

@Entity({ name: dbTableName.USER })
export class User {
  @ObjectIdColumn()
  _id: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column()
  imageUrl: string

  @Column()
  email: string

  @Column()
  phoneNumber: string

  // Bị xóa hay chưa?
  @Column()
  isActive: boolean

  // có đang bị khóa không?
  @Column()
  isLocked: boolean

  // đã xác thực mail hay chưa?
  @Column()
  isVerified: boolean

  @Column()
  createdAt: number

  @Column()
  createdBy: string

  constructor(args: Partial<User>) {
    type T = Partial<User>
    Object.assign<T, T, T>(
      this,
      {
        _id: idGenerator.mainId(),
        isActive: true,
        isLocked: false,
        createdAt: +new Date()
      },
      args
    )
  }
}
