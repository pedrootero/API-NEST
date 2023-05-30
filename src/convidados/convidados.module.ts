import { Module } from '@nestjs/common';
import { SmsService } from 'nest-sns';
import { AuthModule } from 'src/auth/auth.module';
import { SmsModule } from 'src/sms/sms.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ConvidadosController } from './convidados.controller';
import { ConvidadosRepository } from './convidados.respository';
import { ConvidadosService } from './convidados.service';

@Module({
  imports: [UsuarioModule, AuthModule, ConvidadosModule, SmsModule],
  controllers: [ConvidadosController],
  providers: [ConvidadosRepository, ConvidadosService, SmsService],
})
export class ConvidadosModule {}
