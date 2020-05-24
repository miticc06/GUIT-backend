import { Console } from '@utils'
import { tap, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import chalk from 'chalk'
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'

@Injectable()
export class Logging implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        console.log(
          '⛩  ',
          chalk.hex('#eb2f96').bold(context.getArgs()[3].parentType),
          '»',
          context.getArgs()[3].fieldName,
          chalk.hex('#fff566')(`+${Date.now() - now}ms`),
          new Date().toLocaleString()
        )
      }),
      catchError((error) => {
        Console.error(
          chalk.redBright(`Interceptor: `) +
            (error + '').replace(/(Error: |Authentication|UserInputError: )+/g, '')
        )
        return throwError(error)
      })
    )
  }
}
