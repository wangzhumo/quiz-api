import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // fromAuthHeaderAsBearerToken read auth token from header
    constructor(protected readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        })
    }

    async validate(payload: any) {
        console.log('🚫 ~ file:strategy.strategy method:validate line:18  -----', payload)
        // get data from payload
        return {
            uid: payload.uid,
            identityType: payload.identityType,
            identity: payload.identity,
        }
    }
}
