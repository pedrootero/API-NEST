import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'nome não pode ser vazio' })
  nome: string;

  @EmailEhUnico({ message: 'Já existe usuario com este email' })
  @IsEmail({}, { message: 'O email informado não é válido' })
  email: string;

  @MinLength(6, { message: 'Senha precisa ter no minimo 6 caracteres' })
  senha: string;

  @IsString()
  token: String;
}
