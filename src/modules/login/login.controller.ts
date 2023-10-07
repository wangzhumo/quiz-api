import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginAuthDto } from './dto/login.dto';
import { GetAccountDto } from './dto/login-get.dto';

@Controller('ucenter')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('register')
  async register(@Body() body: LoginAuthDto) {
    const ret = await this.loginService.register(
      body.nick,
      body.identityType,
      body.identity,
      body.credential,
    );
    console.log(ret)
    return ret;
  }

  @Post('login')
  login(@Req() request: Request): string {
    console.log('login', request);
    return 'hello login';
  }

  @Get(':uid')
  async getBaseInfo(@Param() req: GetAccountDto) {
    const uidNumber = Number(req.uid)
    const info = await this.loginService.accountInfo(uidNumber)
    return info;
  }
}
