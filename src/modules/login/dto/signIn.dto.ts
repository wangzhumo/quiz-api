import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator'
import { IdentityType } from '../../../common/identityType'

export class SignInAuthDto {
    @IsNotEmpty()
    @IsEnum(IdentityType)
    identityType: number
    @IsNotEmpty()
    @IsString()
    @Length(6)
    identity: string
    @IsNotEmpty()
    @IsString()
    credential: string
}
