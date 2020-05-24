import { getMongoManager } from 'typeorm'
import { NestSchedule } from 'nest-schedule'

import { newError } from './apolloErrors'
import { Console } from './console'

export class ResolverClass extends NestSchedule {
  /** Get selected Fields to make decision: what aggregation pipelines should be included */
  _getSelectedFieldsOnQuery = (info) =>
    info.fieldNodes[0].selectionSet.selections.map(({ name }) => name.value)

  /** Primary condition for query document */
  QueryDocumentCondition = { deleted: false }

  /** Update for deleted document */
  DeleteDocumentCondition = { deleted: true }

  /** Extends `getMongoManager` from `typeorm`. */
  public mongoManager = getMongoManager()

  /** A collection of predefined errors. */
  public err = newError

  /** A collection of custom console.log */
  public Console = Console

  /** NOTE: You can decide whatever you want to do with errors caught by `catch block` in `Queries/Mutations` */
  public catchErrors = (error) => this.err.Apollo(error)
}
