import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/domain/entities/usuario';
import { UsuarioLoginResult } from 'src/app/domain/value-objects/usuario-login-result';
import { HttpRequestService } from '../commons/http-request-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BaseMetodo: string = "auth";

  constructor(private httpRequestService: HttpRequestService) { }

  public async Logar(usuario: Usuario): Promise<UsuarioLoginResult> {
    return await this.httpRequestService.Post(`${this.BaseMetodo}/login`, usuario)
      .then(response => { return response as UsuarioLoginResult; })
      .catch(ex => { throw ex; });
  }

  public async Cadastrar(usuario: Usuario): Promise<UsuarioLoginResult> {
    return await this.httpRequestService.Post(`${this.BaseMetodo}/cadastrar`, usuario)
      .then(response => { return response as UsuarioLoginResult; })
      .catch(ex => { throw ex; });
  }
}
