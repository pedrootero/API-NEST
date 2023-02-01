import { Type } from 'class-transformer';
import { IsArray, IsUrl, ValidateNested } from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';

export class CriaProdutoDTO {
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;

  @ValidateNested()
  @IsArray()
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];
  categoria: string;
}

export class ImagemProdutoDTO {
  @IsUrl()
  url: string;
  descricao: string;
}
