import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('ucenter')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('register')
  async register(@Body() body: any) {
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

  @Get('info/:uid')
  getBaseInfo(@Param('uid') params: string) {
    return 'hello getBaseInfo';
  }
}
