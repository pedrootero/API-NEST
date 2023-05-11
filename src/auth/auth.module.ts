import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    //forwardRef(() => UsuarioModule),
    JwtModule.register({
      secret: '$b6OMHlHehM35xy1qlaPJH2onLxT5*CI',
    }),
  ],
  providers: [AuthService, UsuarioRepository],
  controllers: [AuthController],
})
export class AuthModule {}
