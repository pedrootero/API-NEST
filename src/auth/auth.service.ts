import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from 'src/usuario/usuario.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    //@Inject(forwardRef(() => UsuarioModule))
    private usuarioRepository: UsuarioRepository,
  ) {}

  createToken(usuario) {
    console.log(usuario);

    return this.jwtService.sign(
      {
        name: usuario.username,
        email: usuario.sk,
      },
      {
        expiresIn: 120,
        issuer: 'login',
        audience: 'user',
      },
    );
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'user',
        issuer: 'login',
      });
      return data;
    } catch (error) {}
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.usuarioRepository.buscaPorId(email);

      console.log(user);

      const match = await bcrypt.compare(password, user.passwd);
      console.log({ match });
      if (!user.sk || match == false) {
        return false;
      }
      const token = await this.createToken(user);

      console.log(token);

      user[token] = token;

      return token;
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
