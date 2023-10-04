import { Long } from '@grpc/proto-loader';

export interface AccountAuthInfo {
  uid: Long;
  token: string;
  tokenExpire: Long;
}

export interface AccountBaseInfo {
  uid: Long;
  avatar: string;
  nick: string;
  status: number;
  region: string;
  lastAt: Long;
  createdAt: Long;
}

export interface AccountInfo {
  uid: Long;
  avatar: string;
  nick: string;
  status: number;
  region: string;
  lastAt: Long;
  createdAt: Long;
  token: string;
  tokenExpire: Long;
}
