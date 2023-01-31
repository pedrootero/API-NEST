import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}
  //private usuarioRepository = new UsuarioRepository();

  @Post()
  async criaProdutos(@Body() dadosDoProduto) {
    this.produtoRepository.salvar(dadosDoProduto);
    return dadosDoProduto;
  }

  @Get()
  async listaProdutos() {
    return this.produtoRepository.listar();
  }
}
