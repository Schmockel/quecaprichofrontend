import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/domain/entities/cliente';
import { UsuarioLoginResult } from 'src/app/domain/value-objects/usuario-login-result';
import { HttpRequestService } from '../commons/http-request-service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly BaseMetodo: string = "cliente";

  constructor(private httpRequestService: HttpRequestService) { }

  public async ObterTodos(): Promise<Cliente[]> {
    return await this.httpRequestService.Get(`${this.BaseMetodo}/obtertodos`)
      .then(response => { return response as Cliente[]; })
      .catch(ex => { throw ex; });
  }

  public async Pesquisar(textoPesquisa: string): Promise<Cliente[]> {
    return await this.httpRequestService.Get(`${this.BaseMetodo}/pesquisar/${textoPesquisa}`,)
      .then(response => { return response as Cliente[]; })
      .catch(ex => { throw ex; });
  }

  public async Adicionar(cliente: Cliente): Promise<Cliente> {
    return await this.httpRequestService.Post(`${this.BaseMetodo}/adicionar`, cliente)
      .then(response => { return response as Cliente; })
      .catch(ex => { throw ex; });
  }

  public async Alterar(cliente: Cliente): Promise<Cliente> {
    return await this.httpRequestService.Post(`${this.BaseMetodo}/alterar`, cliente)
      .then(response => { return response as Cliente; })
      .catch(ex => { throw ex; });
  }

  public async Remover(clienteId: number): Promise<Cliente> {
    return await this.httpRequestService.Post(`${this.BaseMetodo}/Remover`, clienteId)
      .then(response => { return response as Cliente; })
      .catch(ex => { throw ex; });
  }

  public async ObterPorId(clienteId): Promise<Cliente> {
    return await this.httpRequestService.Get(`${this.BaseMetodo}/obter/${clienteId}`)
      .then(response => { return response as Cliente; })
      .catch(ex => { throw ex; });
  }
}
