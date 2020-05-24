import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { dbTableName } from '.'
import { idGenerator } from '@src/utils'

@Entity({ name: dbTableName.PERMISSION })
export class Permission {
  @ObjectIdColumn()
  _id: string

  @Column()
  code: string

  @Column()
  descriptions: string

  constructor(args: Partial<Permission>) {
    type T = Partial<Permission>
    Object.assign<T, T, T>(this, { _id: idGenerator.mainId() }, args)
  }
}
