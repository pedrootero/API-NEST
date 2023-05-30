import { IsArray, IsString } from 'class-validator';

export class CriaConvidadoDTO {
  @IsArray()
  nome: string[];

  @IsArray()
  cel: string[];

  @IsString()
  evento: String;
}
