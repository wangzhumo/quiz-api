import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoginModule } from './modules/login/login.module'
import Configuration from './configuration'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UCENTER_SERVICE } from './common/constants'
import { join } from 'path'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import 'winston-daily-rotate-file'
import { ThrottlerModule } from '@nestjs/throttler'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './modules/strategy/jwt.strategy'
import { GoogleStrategy } from './modules/strategy/google.strategy'
import { MongooseModule } from '@nestjs/mongoose'
import { QuizController } from './modules/quiz/quiz.controller';
import { QuizModule } from './modules/quiz/quiz.module';
import * as process from 'process'

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
                                url: `${configService.get<string>('micro.host')}:${configService.get<string>(
                                    'micro.port',
                                )}`,
                                package: configService.get<string>('micro.name'),
                                protoPath: join(__dirname, './_proto/ucenter.proto'),
                                loader: {
                                    enums: String,
                                    objects: true,
                                    arrays: true,
                                },
                            },
                        }
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
                    ),
                }),
            ],
        }),
        ThrottlerModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => [
                {
                    ttl: config.get('throttler.ttl'),
                    limit: config.get('throttler.limit'),
                },
            ],
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            global: true,
            useFactory: async (config: ConfigService) => {
                const secretValue = config.get<string>('JWT_SECRET')
                return {
                    secret: secretValue,
                    signOptions: {
                        expiresIn: '1d',
                    },
                }
            },
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const uri = process.env['MONGODB_URL']
                return {
                    uri,
                    dbName: process.env['MONGODB_DB'],
                    auth: {
                        username: process.env['MONGODB_USER'],
                        password: process.env['MONGODB_PASSWORD'],
                    },
                }
            },
        }),
        LoginModule,
        QuizModule,
    ],
    providers: [JwtStrategy, GoogleStrategy],
    controllers: [QuizController],
})
export class AppModule {}
