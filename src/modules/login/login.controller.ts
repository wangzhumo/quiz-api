import { Body, Controller, Get, Inject, Logger, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { LoginService } from './login.service'
import { RegisterPipe } from './pipes/register.pipe'
import { JwtService } from '@nestjs/jwt'
import { ErrorCode } from '../../common/errorcode'
import { StatusCheck } from '../../common/status'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { SignInAuthDto } from './dto/signIn.dto'
import { SignUpAuthDto } from './dto/signup.dto'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@Controller('ucenter')
export class LoginController {
    constructor(
        private readonly loginService: LoginService,
        private readonly jwtService: JwtService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    @Post('signup')
    @ApiTags('ucenter')
    async signUp(@Body(RegisterPipe) body: SignUpAuthDto) {
        const ret = await this.loginService.register(body.nick, body.identityType, body.identity, body.credential)
        this.logger.log(ret)
        return ret
    }

    @Post('signin')
    @ApiTags('ucenter')
    async signIn(@Body() params: SignInAuthDto) {
        const ret = await this.loginService.login(params.identityType, params.identity, params.credential)
        if (ret.code === ErrorCode.Ok) {
            // generate token
            const token = await this.jwtService.signAsync({
                uid: ret.data.uid,
                identity: ret.data.identity,
                identityType: ret.data.identityType,
            })

            console.log('🚫 ~ file:login.controller method:signIn line:41  -----', token)
            console.log('🚫 ~ file:login.controller method:signIn line:41  -----', ret)
            return StatusCheck.Ok({
                ...ret.data,
                access_token: token,
            })
        }
        return StatusCheck.Code(ret.code, ret.data, ret.msg)
    }

    @Get(':uid')
    @ApiTags('ucenter')
    @UseGuards(AuthGuard('jwt'))
    async getBaseInfo(@Param('uid', ParseIntPipe) uid: number) {
        return await this.loginService.accountInfo(uid)
    }
}
