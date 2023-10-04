import { AccountBaseInfo } from "../interfaces/ucenter.interface";


export interface CreateBaseAccountReq {
    nick: string
    region: string
}

export interface CreateBaseAccountResp {
    code: number
    data: AccountBaseInfo
    msg: string
}

export interface GetAccountReq {
    uid: number
}

export interface GetAccountResp {
    code: number
    data: AccountBaseInfo
    msg: string
}
