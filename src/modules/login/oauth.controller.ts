import { Controller, Get, Inject, Logger, Req, UseGuards } from '@nestjs/common'
import { LoginService } from './login.service'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { ApiTags } from '@nestjs/swagger'
import { GoogleOauthGuard } from 'guards/google-oauth.guard'

@ApiTags('oauth')
@Controller('oauth')
export class OauthController {
    constructor(
        private readonly loginService: LoginService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async googleAuth(@Req() req: any) {
        console.log('🚫 ~ file:oauth.controller method:googleAuth line:18  -----', req)
    }

    @Get('google/redirect')
    @UseGuards(GoogleOauthGuard)
    googleAuthRedirect(@Req() req: any) {
        console.log('🚫 ~ file:oauth.controller method:googleAuthRedirect line:24  -----', req)
        return this.loginService.googleLogin(req)
    }
}
