import { Injectable } from '@angular/core';
import { Produto } from 'src/domain/entities/produto';
import { HttpRequestService } from '../commons/http-request-service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly BaseMetodo: string = "produto";

  constructor(private httpRequestService: HttpRequestService) { }

  public async ObterTodos(): Promise<Produto[]> {
    return await this.httpRequestService.Get(`${this.BaseMetodo}/obtertodos`)
      .then(response => { return response as Produto[]; })
      .catch(ex => { throw ex; });
  }

  public async Pesquisar(textoPesquisa: string): Promise<Produto[]> {
    return await this.httpRequestService.Get(`${this.BaseMetodo}/pesquisar/${textoPesquisa}`,)
      .then(response => { return response as Produto[]; })
      .catch(ex => { throw ex; });
  }

  public async Adicionar(produto: Produto): Promise<Produto> {
    return await this.httpRequestService.Post(`${this.BaseMetodo}/adicionar`, produto)
      .then(response => { return response as Produto; })
      .catch(ex => { throw ex; });
  }

  public async Alterar(produto: Produto): Promise<Produto> {
    return await this.httpRequestService.Post(`${this.BaseMetodo}/alterar`, produto)
      .then(response => { return response as Produto; })
      .catch(ex => { throw ex; });
  }

  public async Remover(produtoId: number): Promise<Produto> {
    return await this.httpRequestService.Post(`${this.BaseMetodo}/Remover`, produtoId)
      .then(response => { return response as Produto; })
      .catch(ex => { throw ex; });
  }

  public async ObterPorId(produtoId): Promise<Produto> {
    return await this.httpRequestService.Get(`${this.BaseMetodo}/obter/${produtoId}`)
      .then(response => { return response as Produto; })
      .catch(ex => { throw ex; });
  }
}
