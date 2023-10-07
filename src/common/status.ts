import { ErrorCode } from './errorcode'

export class StatusCheck {
    static Ok(data?: any, message?: string) {
        return {
            code: ErrorCode.Ok,
            data: data,
            msg: message,
        }
    }

    static Error(data?: any, error?: string) {
        return {
            code: ErrorCode.Failure,
            data: data,
            msg: error,
        }
    }

    static Code(code: ErrorCode, data?: any, message?: string) {
        return {
            code: code,
            data: data,
            msg: message,
        }
    }
}
