import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UCENTER_SERVICE } from '../../common/constants';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [LoginController],
  providers: [
    LoginService,
    {
      provide: UCENTER_SERVICE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('MicroServer.host'),
            port: configService.get<number>('MicroServer.port'),
          },
        });
      },
    },
  ],
})
export class LoginModule {}
