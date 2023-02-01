import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioRepository } from '../usuario.repository';

//classe que valida se email existe
@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private UsuarioRepository: UsuarioRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioComEmailExiste = await this.UsuarioRepository.existeComEmail(
      value,
    );
    return !usuarioComEmailExiste; // se  o retorno de existeComEmail for true(existe email) ele retorna a negação (um false) e nao deixa passar.
    //Se o retorno de existeComEmail for false quer dizer que o email é undefiened (não existe o usuario) ai ele retorna a negação(true) e deixar passar.
  }
}

//classe para criar o decorator
export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicoValidator,
    });
  };
};
