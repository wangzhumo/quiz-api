import { Module } from '@nestjs/common'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { PassportModule } from '@nestjs/passport'
import { OauthController } from './oauth.controller'

@Module({
    imports: [PassportModule],
    controllers: [LoginController, OauthController],
    providers: [LoginService],
})
export class LoginModule {}
