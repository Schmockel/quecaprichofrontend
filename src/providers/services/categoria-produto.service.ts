import { Injectable } from '@angular/core';
import { CategoriaProduto } from 'src/domain/entities/categoria-produto';
import { HttpRequestService } from '../commons/http-request-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoService {
  private readonly BaseMetodo: string = "categoriaproduto";

  constructor(private httpRequestService: HttpRequestService) { }
  public async Adicionar(categoriaProduto: CategoriaProduto): Promise<CategoriaProduto> {
    return await this.httpRequestService.Post(`${this.BaseMetodo}/adicionar`, categoriaProduto)
      .then(response => { return response as CategoriaProduto; })
      .catch(ex => { throw ex; });
  }

  public async Alterar(categoriaProduto: CategoriaProduto): Promise<CategoriaProduto> {
    return await this.httpRequestService.Post(`${this.BaseMetodo}/alterar`, categoriaProduto)
      .then(response => { return response as CategoriaProduto; })
      .catch(ex => { throw ex; });
  }

  public async Remover(categoriaProdutoId: number): Promise<CategoriaProduto> {
    return await this.httpRequestService.Post(`${this.BaseMetodo}/Remover`, categoriaProdutoId)
      .then(response => { return response as CategoriaProduto; })
      .catch(ex => { throw ex; });
  }

  public async ObterPorId(categoriaProdutoId): Promise<CategoriaProduto> {
    return await this.httpRequestService.Get(`${this.BaseMetodo}/obter/${categoriaProdutoId}`)
      .then(response => { return response as CategoriaProduto; })
      .catch(ex => { throw ex; });
  }

  public async ObterTodos(): Promise<CategoriaProduto[]> {
    return await this.httpRequestService.Get(`${this.BaseMetodo}/obtertodos`)
      .then(response => { return response as CategoriaProduto[]; })
      .catch(ex => { throw ex; });
  }
}
