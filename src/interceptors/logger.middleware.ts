import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import chalk from 'chalk'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: any) {
    console.log(new Date().toLocaleString(), '📢  ', chalk.hex('#69c0ff').bold('Request'), '»')
    next()
  }
}
