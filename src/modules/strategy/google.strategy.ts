import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(protected readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('oauth.google.client_id'),
            clientSecret: configService.get<string>('oauth.google.secret'),
            callbackURL: 'http://localhost:4000/oauth/google/redirect',
            scope: ['email', 'profile'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        console.log('🚫 ~ file:google.strategy method:validate line:18  -----', accessToken, profile)
        const { name, emails, photos } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        }

        done(null, user)
    }
}
