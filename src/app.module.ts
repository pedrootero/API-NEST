import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProdutoModule } from './produtos/produto.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule, ProdutoModule, AuthModule],
  // controllers: [UsuarioController],
  // providers: [],
})
export class AppModule {}
