import { Cliente } from "./cliente";
import { EncomendaProduto } from "./encomenda-produto";

export class Encomenda {
  EncomendaId: number;
  ClienteId: number;
  DataEncomenda: string;
  DataEntrega: string;
  Valor: number;
  Ativo: boolean;
  Cancelado: boolean;
  Apagado: boolean;
  Cliente: Cliente;
  ListaEncomendaProduto: EncomendaProduto[];

}
