import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('ucenter')
export class LoginController {


  constructor(private readonly loginService: LoginService) {}

  @Post('register')
  register(@Req() request: Request): string {
    console.log('register', request);
    return 'hello register';
  }

  @Post('login')
  login(@Req() request: Request): string {
    console.log('login', request);
    return 'hello login';
  }

  @Get('info/:uid')
  getBaseInfo(@Param('uid') params: string) {
    const uid = params;
    console.log('getBaseInfo', uid);
    this.loginService.sendMessage(uid)
    return 'hello getBaseInfo';
  }
}
