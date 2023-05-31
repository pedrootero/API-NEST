import { Module } from '@nestjs/common';
import { SnsModule } from 'nest-sns';

@Module({
  imports: [
    SnsModule.register({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    }),
  ],

  providers: [SendMsg],
  exports: [SendMsg],
})
export class SendMsg {}
