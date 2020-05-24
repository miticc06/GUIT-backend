import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { dbTableName } from '.'
import { idGenerator } from '@src/utils'

@Entity({ name: dbTableName.ROLE })
export class Role {
  @ObjectIdColumn()
  _id: string

  @Column()
  name: string

  @Column()
  code: string

  @Column()
  descriptions: string

  @Column()
  type: string

  @Column()
  permissions: string[]

  @Column()
  createdAt: number

  constructor(args: Partial<Role>) {
    type T = Partial<Role>
    Object.assign<T, T, T>(
      this,
      {
        _id: idGenerator.mainId(),
        createdAt: +new Date()
      },
      args
    )
  }
}
