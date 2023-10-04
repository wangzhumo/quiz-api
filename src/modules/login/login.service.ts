import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UCENTER_SERVICE } from '../../common/constants';
import { lastValueFrom } from 'rxjs';
import { StatusCheck } from '../../common/status';
import { ErrorCode } from '../../common/errorcode';
import { UCenterService } from '../interfaces/ucenter.service';

@Injectable()
export class LoginService implements OnModuleInit {
  constructor(@Inject(UCENTER_SERVICE) private clientGrpc: ClientGrpc) {}

  private client: UCenterService;

  onModuleInit(): any {
    this.client = this.clientGrpc.getService<UCenterService>('UCenterService');
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
    const ret = await lastValueFrom(
      this.client.Register({
        nick: nick,
        identity: identity,
        identityType: identityType,
        credential: credential,
      }),
    );
    if (ret && ret.code !== ErrorCode.Ok) {
      return StatusCheck.Code(ret.code);
    }
    const registerRet = {
      ...ret.data,
      uid: ret.data.uid.toNumber(),
      lastAt: ret.data.lastAt.toNumber(),
      createdAt: ret.data.createdAt.toNumber(),
      tokenExpire: ret.data.tokenExpire.toNumber(),
    };
    return StatusCheck.Ok(registerRet);
  }
}
