import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CriaUsuarioDTO } from '../usuario/dto/CriaUsuario.dto';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { AuthService } from './auth.service';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userRepository: UsuarioRepository,
    private readonly authService: AuthService,
  ) {}
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto) {
    return await this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() dadosUsuario: CriaUsuarioDTO) {
    this.userRepository.salvar(dadosUsuario);

    return {
      usuario: dadosUsuario.nome,
      message: 'usuario criado com sucesso!',
    };
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@Req() req) {
    return { me: 'ok', data: req.tokenPayload };
  }
}
