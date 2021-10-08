import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpRequestService {
  constructor(private http: HttpClient) { }

  public async Post(metodo: string, body: any): Promise<any> {
    let headers = this.ObterCabecalhoDaRequisicao();

    return await this.http.post(environment.apiUrl + metodo, body, { headers: headers })
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch(ex => {
        throw ex;
      });
  }

  public async Get(metodo: string, url: string = null): Promise<any> {
    let headers = this.ObterCabecalhoDaRequisicao();

    return await this.http.get((url == null ? environment.apiUrl : url) + metodo, { headers: headers })
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch(ex => {
        throw ex;
      });
  }

  public async Put(metodo: string, body: any): Promise<any> {
    let headers = this.ObterCabecalhoDaRequisicao();

    return await this.http.put(environment.apiUrl + metodo, body, { headers: headers })
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch(ex => {
        throw ex;
      });
  }

  private ObterCabecalhoDaRequisicao(): HttpHeaders {
    const headers: any = {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Origin": "*" };

    return new HttpHeaders(headers);
  }
}
