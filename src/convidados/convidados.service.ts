import { Injectable } from '@nestjs/common';

import { SendMsg } from 'src/sms/sms.service';
import { ConvidadosRepository } from './convidados.respository';
import { CriaConvidadoDTO } from './dto/criaConvidados';

@Injectable()
export class ConvidadosService {
  constructor(
    private convidadosRepository: ConvidadosRepository,

    private sendSms: SendMsg,
  ) {}

  async postConvidados(dadosConvidados: CriaConvidadoDTO) {
    let result = [];
    let sms = [];
    for (let i = 0; i < dadosConvidados.nome.length; i++) {
      const nome = dadosConvidados.nome[i];
      const cel = dadosConvidados.cel[i];
      const evento = dadosConvidados.evento;

      const r = await this.convidadosRepository.salvar(nome, cel, evento);

      const s = await this.sendSms.sendSms(nome, cel, evento);

      console.log({ r });
      result.push(r);

      sms.push(s);
    }
    console.log('service:  ', result);
    return sms;
  }
}
