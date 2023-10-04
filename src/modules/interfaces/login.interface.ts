import { AccountAuthInfo, AccountInfo } from '../interfaces/ucenter.interface'

export interface LoginAuthReq {
    identityType: number
    identity: string
    credential: string
}

export interface LoginAuthResp {
    code: number
    data: AccountAuthInfo
    msg: string
}

export interface RegisterReq {
    nick: string
    identityType: number
    identity: string
    credential: string
}

export interface RegisterResp {
    code: number
    data: AccountInfo
    msg: string
}
