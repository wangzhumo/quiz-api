import * as process from 'process';

export default () => ({
  MicroServer: {
    name: process.env.MICRO_NAME,
    host: process.env.MICRO_HOST,
    port: parseInt(process.env.MICRO_PORT),
  },
});
