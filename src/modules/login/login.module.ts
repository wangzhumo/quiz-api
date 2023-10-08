import { Module } from '@nestjs/common'
import { LoginController } from './login.controller'
import { LoginService } from './login.service'
import { PassportModule } from '@nestjs/passport'

@Module({
    imports: [PassportModule],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {}
