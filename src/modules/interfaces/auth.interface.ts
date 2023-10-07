import { AccountAuthInfo, AccountInfo } from './ucenter.interface';

export interface HasAuthAccountReq {
    identityType: number
    identity: string
}

export interface HasAuthAccountResp {
    code: number
    data: AccountAuthInfo
    msg: string
}

export interface CreateAuthAccountReq {
    nick: string
    identityType: number
    identity: string
    credential: string
}

export interface CreateAuthAccountResp {
    code: number
    data: AccountInfo
    msg: string
}
