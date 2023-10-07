import { IsNotEmpty, Length } from 'class-validator';

export class GetAccountDto {
  @IsNotEmpty()
  @Length(10)
  uid: string
}