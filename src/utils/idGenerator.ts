import { v1 as uuidv1 } from 'uuid'
import { V1Options } from 'uuid/interfaces'

function generateRandomNumber(): string {
  // tslint:disable-next-line:no-bitwise
  const randomNumber = ~~(Math.random() * (999 - 100) + 100)

  return `${randomNumber < 10 ? '00' : randomNumber < 100 ? '0' : ''}${randomNumber}`
}

export const idGenerator = {
  mainId: (v1Options?: V1Options) => uuidv1(v1Options),
  subId: (): string => {
    return `${generateRandomNumber()}-${generateRandomNumber()}-${generateRandomNumber()}`
  }
}
