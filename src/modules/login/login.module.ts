import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UCENTER_SERVICE } from '../../common/constants';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  controllers: [LoginController],
  providers: [
    LoginService,
    {
      provide: UCENTER_SERVICE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: '127.0.0.1:8000',
            package: 'ucenter',
            protoPath: join(__dirname,'../../../_proto/ucenter.proto'),
            loader: {
              enums: String,
              objects: true,
              arrays: true
            }
          }
        });
      },
    },
  ],
})
export class LoginModule {}
