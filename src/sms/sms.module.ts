import { Module } from '@nestjs/common';
import { SnsModule } from 'nest-sns';
import { ConvidadosModule } from 'src/convidados/convidados.module';
import { ConvidadosService } from 'src/convidados/convidados.service';
import { SendSMS } from './sms.service';

@Module({
  imports: [
    SnsModule.register({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    }),
    ConvidadosModule,
  ],
  //controllers: [SeuController],
  providers: [SendSMS, ConvidadosService],
  exports: [SendSMS],
})
export class SmsModule {}
