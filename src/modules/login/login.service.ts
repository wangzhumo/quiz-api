import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UCENTER_SERVICE } from '../../common/constants';

@Injectable()
export class LoginService {

  constructor(@Inject(UCENTER_SERVICE) private client: ClientProxy) {}
  // @Client(UCenterServiceClientOption) private readonly client: ClientTCP;

  sendMessage(uid: string) {
    const command = { cmd: 'find_account' };
    this.client.send<string>(command, uid).subscribe((value: string) => {
      console.log("sendMessage subscribe",value)
    })
    console.log("sendMessage ",command,uid)
  }
}
