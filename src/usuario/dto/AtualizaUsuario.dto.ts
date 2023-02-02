import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class AtualizaUsuarioDTO {
  @IsNotEmpty({ message: 'nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @EmailEhUnico({ message: 'Já existe usuario com este email' })
  @IsEmail({}, { message: 'O email informado não é válido' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'Senha precisa ter no minimo 6 caracteres' })
  @IsOptional()
  senha: string;
}
