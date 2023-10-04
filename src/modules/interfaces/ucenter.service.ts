import { Observable } from 'rxjs';
import {
  CreateBaseAccountReq,
  CreateBaseAccountResp,
  GetAccountReq,
  GetAccountResp,
} from './account.interface';
import {
  LoginAuthReq,
  LoginAuthResp,
  RegisterReq,
  RegisterResp,
} from './login.interface';
import {
  CreateAuthAccountReq,
  CreateAuthAccountResp,
  HasAuthAccountReq,
  HasAuthAccountResp,
} from './auth.interface';

export interface UCenterService {
  GetAccount(data: GetAccountReq): Observable<GetAccountResp>;

  CreateBaseAccount(
    data: CreateBaseAccountReq,
  ): Observable<CreateBaseAccountResp>;

  HasAuthAccount(data: HasAuthAccountReq): Observable<HasAuthAccountResp>;

  CreateAuthAccount(
    data: CreateAuthAccountReq,
  ): Observable<CreateAuthAccountResp>;

  LoginAuth(data: LoginAuthReq): Observable<LoginAuthResp>;

  Register(data: RegisterReq): Observable<RegisterResp>;
}
