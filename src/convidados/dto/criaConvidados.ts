import { IsArray, IsString } from 'class-validator';

export class CriaConvidadoDTO {
  @IsArray()
  nome: String[];

  @IsArray()
  cel: String[];

  @IsString()
  evento: String;
}
