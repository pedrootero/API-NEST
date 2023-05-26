import { Injectable } from '@nestjs/common';
import { ConvidadosRepository } from './convidados.respository';
import { CriaConvidadoDTO } from './dto/criaConvidados';

@Injectable()
export class ConvidadosService {
  constructor(private convidadosRepository: ConvidadosRepository) {}

  async postConvidados(dadosConvidados: CriaConvidadoDTO) {
    let result = [];
    for (let i = 0; i < dadosConvidados.nome.length; i++) {
      const nome = dadosConvidados.nome[i];
      const cel = dadosConvidados.cel[i];
      const evento = dadosConvidados.evento;

      const r = await this.convidadosRepository.salvar(nome, cel, evento);
      console.log({ r });
      result.push(r);
    }
    console.log('service:  ', result);
    return result;
  }
}
