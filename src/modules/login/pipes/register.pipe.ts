import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { IdentityType } from '../../../common/identityType'
import { SignUpAuthDto } from "../dto/signup.dto";

@Injectable()
export class RegisterPipe implements PipeTransform {
    transform(value: SignUpAuthDto, metadata: ArgumentMetadata) {
        console.log('🚫 ~ file:register.pipe method:transform line:6  -----', metadata)
        console.log('🚫 ~ file:register.pipe method:transform line:7  -----', value)
        if (!value.nick || value.nick.length === 0) {
            // 通过类型获取
            let nickAppend = 'User'
            const type = value.identityType ?? 0
            if (type === IdentityType.GOOGLE) {
                nickAppend = `Google${Date.now()}`
            } else if (type === IdentityType.APPLE) {
                nickAppend = `Apple${Date.now()}`
            } else {
                nickAppend = `User${Date.now()}`
            }
            return { ...value, nick: nickAppend }
        }
        return value
    }
}
