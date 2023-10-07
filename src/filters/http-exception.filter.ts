import { LoggerService } from '@nestjs/common'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private logger: LoggerService) {}
    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        // response
        const response = ctx.getResponse()
        // const request = Pctx.getRequest();
        // http status code
        const status = exception.getStatus()
        this.logger.error(exception.message, exception.stack)
        response.status(status).json({
            code: status,
            // path: request.url,
            // method: request.method,
            message: exception.message || exception.name,
        })
        // throw new Error('Method not implemented.');
    }
}
