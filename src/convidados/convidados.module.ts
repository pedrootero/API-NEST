import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SendMsg } from 'src/sms/sms.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ConvidadosController } from './convidados.controller';
import { ConvidadosRepository } from './convidados.respository';
import { ConvidadosService } from './convidados.service';

@Module({
  imports: [UsuarioModule, AuthModule, ConvidadosModule, SendMsg],
  controllers: [ConvidadosController],
  providers: [ConvidadosRepository, ConvidadosService],
})
export class ConvidadosModule {}
