import { ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common'
import { ArgumentsHost, Catch } from '@nestjs/common'
import * as requestIp from 'request-ip'
import { HttpAdapterHost } from '@nestjs/core'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly logger: LoggerService,
        private readonly httpAdapterHost: HttpAdapterHost,
    ) {}
    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost
        const ctx = host.switchToHttp()
        const request = ctx.getRequest()
        const response = ctx.getResponse()

        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const responseBody = {
            headers: request.headers,
            query: request.query,
            body: request.body,
            params: request.params,
            timestamp: new Date().toISOString(),
            ip: requestIp.getClientIp(request),
            exceptioin: exception['name'],
            error: exception['response'] || 'Internal Server Error',
        }
        console.log('🚫 ~ file:all-exception.filter method:catch line:30  -----', exception)
        this.logger.error('[ucenter]', responseBody)
        httpAdapter.reply(response, responseBody, httpStatus)
    }
}
