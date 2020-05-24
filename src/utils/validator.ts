import { verify } from 'jsonwebtoken'
import { _appConfigs, _logic } from '@constants'
import * as bcrypt from 'bcrypt'

const { SECRET_KEY = _appConfigs.DEFAULT_SECRET_KEY } = process.env

/**
 * Verify that token is valid or not. If token is valid then decode and return `_id`, return `null` if it's not
 * @param token - JsonWebToken
 */
export const extractIdFromToken = (token: string): string | null =>
  verify(token, SECRET_KEY)['userId'] || null

/**
 * Verify that strings is valid or not
 * @param argument - String
 */
export function isStringsValid(argument: Array<string>): boolean {
  return !argument.some((str) => str.replace(/\s+/g, '').length === 0)
}

export function isDateValid(argument: number): boolean {
  return argument > +new Date()
}

export function isValidCode(argument: Array<string>): boolean {
  const regex = new RegExp('^[A-Z0-9_]{5,}$', '')
  return argument.every((str) => regex.test(str))
}

export function verifyPassword(password: string): boolean {
  return !!password && new RegExp(_logic.REGEX_PASSWORD).test(password)
}

export function verifyUsername(username: string): boolean {
  return !!username && new RegExp(_logic.REGEX_USERNAME).test(username.toLowerCase())
}

export function encryptPassword(rawPassword: string) {
  return bcrypt.hashSync(rawPassword, _appConfigs.SALT_ROUNDS)
}

export function isValidEmail(email: string): boolean {
  return !!email && new RegExp(_logic.REGEX_EMAIL).test(email)
}
