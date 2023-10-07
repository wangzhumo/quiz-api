import { AccountAuthInfo, AccountInfo } from './ucenter.interface'

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

export interface AuthSignInReq {
    identityType: number
    identity: string
    credential: string
}

export interface AuthSignInResp {
    code: number
}

export interface AuthSignUpReq {
    identityType: number
    identity: string
    credential: string
}

export interface AuthSignUpResp {
    code: number
}
