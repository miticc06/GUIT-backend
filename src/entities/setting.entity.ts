import { Entity, Column, ObjectIdColumn } from 'typeorm'

import { dbTableName } from '.'
import { idGenerator } from '@src/utils'

@Entity({ name: dbTableName.SETTING })
export class Setting {
  @ObjectIdColumn()
  _id: string

  @Column()
  domain: string

  constructor(args: Partial<Setting>) {
    type T = Partial<Setting>
    Object.assign<T, T, T>(
      this,
      {
        _id: idGenerator.mainId(),
        domain: ''
      },
      args
    )
  }
}
