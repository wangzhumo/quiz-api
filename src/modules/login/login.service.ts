import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { UCENTER_SERVICE } from '../../common/constants'
import { lastValueFrom } from 'rxjs'
import { StatusCheck } from '../../common/status'
import { ErrorCode } from '../../common/errorcode'
import { UCenterService } from '../interfaces/ucenter.service'
import { GetAccountResp } from '../interfaces/account.interface'
import { AuthSignInResp, AuthSignUpResp } from '../interfaces/login.interface'

@Injectable()
export class LoginService implements OnModuleInit {
    constructor(@Inject(UCENTER_SERVICE) private clientGrpc: ClientGrpc) {}

    private client: UCenterService

    onModuleInit(): any {
        this.client = this.clientGrpc.getService<UCenterService>('UCenterService')
    }

    /**
     * get account base info
     * @param uid
     */
    async accountInfo(uid: number): Promise<GetAccountResp> {
        const ret = await lastValueFrom(
            this.client.GetAccount({
                uid: uid,
            }),
        )
        if (ret && ret.code !== ErrorCode.Ok) {
            return StatusCheck.Code(ret.code)
        }
        const dbInfo = {
            ...ret.data,
            uid: ret.data.uid.toString(),
            lastAt: ret.data.lastAt.toNumber(),
            createdAt: ret.data.createdAt.toNumber(),
        }
        return StatusCheck.Ok(dbInfo)
    }

    /**
     * register new acctount
     * @param nick
     * @param identityType
     * @param identity
     * @param credential
     */
    async register(nick: string, identityType: number, identity: string, credential: string): Promise<AuthSignUpResp> {
        const ret = await lastValueFrom(
            this.client.AuthSignUp({
                nick: nick,
                identity: identity,
                identityType: identityType,
                credential: credential,
            }),
        )
        if (ret && ret.code !== ErrorCode.Ok) {
            return StatusCheck.Code(ret.code)
        }
        const registerRet = {
            ...ret.data,
            uid: ret.data.uid.toString(),
            lastAt: ret.data.lastAt.toNumber(),
            createdAt: ret.data.createdAt.toNumber(),
        }
        return StatusCheck.Ok(registerRet)
    }

    /**
     * login
     * @param identityType
     * @param identity
     * @param credential
     */
    async login(identityType: number, identity: string, credential: string): Promise<AuthSignInResp> {
        const ret = await lastValueFrom(
            this.client.AuthSignIn({
                credential: credential,
                identity: identity,
                identityType: identityType,
            }),
        )
        // has this account ?
        if (ret?.code !== ErrorCode.Ok) {
            return StatusCheck.Code(ret?.code)
        }
        console.log('🚫 ~ file:login.service method:login line:91  -----', ret.data)
        console.log('🚫 ~ file:login.service method:login line:91  -----', ret.data.uid.toString())
        // return account info
        const signInRet = {
            ...ret.data,
            uid: ret.data.uid.toString(),
            lastAt: ret.data.lastAt.toNumber(),
            createdAt: ret.data.createdAt.toNumber(),
        }
        return StatusCheck.Ok(signInRet)
    }

    async googleLogin(params: any) {
        console.log('🚫 ~ file:login.service method:googleLogin line:104  -----', params)
    }
}
