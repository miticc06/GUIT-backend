/**
 * Subscriptions Context
 * @readonly `connection`: any
 * @readonly `currentUserId?`: string
 * @readonly `variables?`: any
 */
export interface SContext {
  connection: any
  currentUserId?: string
  variables?: any
  session?: string
}

/**
 * Queries / Mutations Context
 * @readonly `req`: any
 * @readonly `currentUserId?`: string
 */
export interface IContext {
  req?: any
  currentUserId?: string
  username?: string
  fullName?: string
  session?: string
}
