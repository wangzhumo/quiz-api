import { Body, Controller, Post } from '@nestjs/common'
import { SignInAuthDto } from './dto/signin.dto'

@Controller('auth')
export class AuthController {
    @Post('signin')
    signIn(@Body() dto: SignInAuthDto) {
        return ''
    }

    @Post('signup')
    signUp() {
        return ''
    }
}
