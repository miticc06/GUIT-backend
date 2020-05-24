import { Injectable } from '@nestjs/common'
import { Timeout } from 'nest-schedule'
import chalk from 'chalk'
import { _appConfigs } from '@constants'
import { ResolverClass } from '@utils'

function highlight(string: string) {
  return `${chalk.greenBright.bold(string)}`
}

@Injectable()
export class ScheduleService extends ResolverClass {
  // NOTE: Register root account
  @Timeout(300 * Math.PI, { key: `dbChecking${+new Date()}` })
  async dbChecking() {
    try {
    } catch (err) {
      console.log(err)
    }
  }
}
