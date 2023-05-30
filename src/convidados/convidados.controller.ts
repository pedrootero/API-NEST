import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/guards/auth.guard';
import { ConvidadosRepository } from './convidados.respository';
import { ConvidadosService } from './convidados.service';
import { CriaConvidadoDTO } from './dto/criaConvidados';

@Controller('/convidados')
export class ConvidadosController {
  constructor(
    private convidadosRepository: ConvidadosRepository,
    private convidadosService: ConvidadosService,
  ) {}

  @Post()
  @UseGuards(JWTGuard)
  async salvaConvidados(@Body() dadosDoConvidado: CriaConvidadoDTO) {
    console.log('dados do convidado no controller: ', dadosDoConvidado);
    this.convidadosService.postConvidados(dadosDoConvidado);

    return {
      convidados: dadosDoConvidado.nome,
      message: 'Convites enviados sucesso',
    };
  }

  @Get()
  async listaConvidados() {
    return this.convidadosRepository.listar();
  }
}
