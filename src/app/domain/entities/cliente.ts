import { Endereco } from "./endereco";
import { Telefone } from "./telefone";

export class Cliente {
  ClienteId: number;
  Nome: string;
  CPF: string;
  Email: string;
  Apagado: boolean;
  Enderecos: Endereco[];
  Telefones: Telefone[];
}
