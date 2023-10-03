import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UCENTER_SERVICE } from '../../common/constants';
import { lastValueFrom } from 'rxjs';
import { StatusCheck } from '../../common/status';
import { ErrorCode } from '../../common/errorcode';

@Injectable()
export class LoginService {
  constructor(@Inject(UCENTER_SERVICE) private client: ClientProxy) {}

  // @Client(UCenterServiceClientOption) private readonly client: ClientTCP;

  sendMessage(uid: string) {
    const command = { cmd: 'find_account' };
    this.client.send<string>(command, uid).subscribe((value: string) => {
      console.log('sendMessage subscribe', value);
    });
    console.log('sendMessage ', command, uid);
  }

  /**
   * register new acctount
   * @param nick
   * @param identityType
   * @param identity
   * @param credential
   */
  async register(
    nick: string,
    identityType: number,
    identity: string,
    credential: string,
  ) {
    const command = {
      cmd: 'auth_account',
    };
    const ret = await lastValueFrom(this.client.send(command, {
      nick: nick,
      identity: identity,
      identityType: identityType,
      credential: credential,
    }))
    if (ret && ret.code !== ErrorCode.Ok) {
      return StatusCheck.Code(ret.code, ret.data)
    }
    return StatusCheck.Ok(ret.data);
  }
}
