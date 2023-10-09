import { AuthGuard } from '@nestjs/passport'

/**
 * simplify guard
 */
export class JwtGuard extends AuthGuard('strategy') {
    constructor() {
        super()
    }
}
