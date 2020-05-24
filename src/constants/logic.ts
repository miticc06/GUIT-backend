// tslint:disable
const REGEX_PASSWORD: RegExp = /^[\x00-\x7F]*$/gi
const REGEX_EMAIL: RegExp = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const REGEX_USERNAME: RegExp = /^[\w\.\@]{5,}$/gi

export const _logic = {
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_USERNAME
}
