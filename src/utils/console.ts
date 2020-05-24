import chalk from 'chalk'

export const Console = {
  error: (message) => {
    console.log(`${chalk.redBright('ERROR:')} ${chalk.red(message)}`)
  },
  log: (message) => {
    console.log(`${chalk.whiteBright(message)}`)
  },
  now: () => {
    console.log(`${chalk.blueBright(`${+new Date()}`)}`)
  },
  table: (data) => {
    console.table(data)
  },
  warn: (message) => {
    console.log(`${chalk.yellowBright('WARNING:')} ${chalk.yellow(message)}`)
  },
  info: (message) => {
    console.log(`${chalk.blueBright(message)}`)
  },
  success: (message) => {
    console.log(`${chalk.greenBright(message)}`)
  }
}
