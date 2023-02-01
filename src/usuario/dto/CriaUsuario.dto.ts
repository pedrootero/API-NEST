import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({ message: 'nome não pode ser vazio' })
  nome: string;

  @IsEmail({}, { message: 'O email informado não é válido' })
  email: string;

  @MinLength(6, { message: 'Senha precisa ter no minimo 6 caracteres' })
  senha: string;
}
