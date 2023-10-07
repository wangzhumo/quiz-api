import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginModule } from './modules/login/login.module';
import { AuthModule } from './modules/auth/auth.module';
import Configuration from './configuration';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UCENTER_SERVICE } from './common/constants';
import { join } from 'path';
import { WinstonModule } from "nest-winston";
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: UCENTER_SERVICE,
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            return {
              transport: Transport.GRPC,
              options: {
                url: `${configService.get<string>(
                  'micro.host',
                )}:${configService.get<string>('micro.port')}`,
                package: configService.get<string>('micro.name'),
                protoPath: join(__dirname, './_proto/ucenter.proto'),
                loader: {
                  enums: String,
                  objects: true,
                  arrays: true,
                },
              },
            };
          },
        },
      ],
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: `logs`, // log dir
          filename: '%DATE%.log', // log file name
          datePattern: 'YYYY-MM-DD', // looper duration
          zippedArchive: true, // zip
          maxSize: '20m', // max size
          maxFiles: '14d', // save max day
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.json(),
          )
        })
      ]
    }),
    LoginModule,
    AuthModule,
  ],
})
export class AppModule {}
