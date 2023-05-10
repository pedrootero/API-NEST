import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRepository } from '../usuario/usuario.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usuarioRepository: UsuarioRepository,
  ) {}

  async createToken(email) {
    const usuario = await this.usuarioRepository.buscaPorId(email);
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
    //return this.jwtService.verify()
  }

  async login(email: string, password: string) {
    try {
      const user = await this.usuarioRepository.buscaPorId(email);
      if (!user.email) {
        //email não existe
      }
      if (!user.passwd) {
        //senha incorreta
      }
      this.createToken(email);
    } catch (error) {}
  }

  async forget(email) {}

  async reset(email, novosDados) {
    //TO DO Validar o token

    const id = 0;

    const user = await this.usuarioRepository.atualiza(email, novosDados);

    return this.createToken(user);
  }
}
