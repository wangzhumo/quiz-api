import { ClientOptions, Transport } from '@nestjs/microservices';

export const UCenterServiceClientOption: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:8000',
    package: 'ucenter',
    protoPath: ''
  }
};