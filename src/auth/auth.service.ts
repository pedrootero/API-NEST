import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from '../usuario/usuario.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usuarioRepository: UsuarioRepository,
  ) {}

  async createToken(usuario) {
    console.log(usuario);

    return this.jwtService.sign(
      {
        sub: usuario.id,
        name: usuario.nome,
        email: usuario.email,
      },
      {
        expiresIn: '1 day',
        subject: String(usuario.id),
        issuer: 'API',
        audience: 'user',
      },
    );
  }

  async checkToken(token: string) {
    return this.jwtService.verify(token, {
      audience: 'user',
      issuer: 'API',
    });
  }

  async login(email: string, password: string) {
    try {
      const user = await this.usuarioRepository.buscaPorId(email);
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const match = await bcrypt.compare(user.senha, hash);

      if (!user.email || match == false) {
        return false;
      }
      this.createToken(user);
    } catch (error) {}
  }

  async forget(email) {
    const user = await this.usuarioRepository.buscaPorId(email);

    if (!user.email) {
      throw new UnauthorizedException('E-mail está incorreto.');
    }
    //TO DO enviar o email
    return true;
  }

  async reset(email, token, novosDados) {
    //TO DO Validar o token se for valido atualiza dados

    const id = 0;

    const user = await this.usuarioRepository.atualiza(email, novosDados);

    return true;
  }
}
