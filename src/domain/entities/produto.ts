import { CategoriaProduto } from "./categoria-produto";
import { ProdutoFoto } from "./produto-foto";

export class Produto {
  constructor( ) {

  }

  ProdutoId: number;
  CategoriaProdutoId: number;
  Nome: string;
  Valor: number;
  Ativo: boolean;
  Apagado: boolean;
  CategoriaProduto: CategoriaProduto;
  ProdutoFotos: ProdutoFoto[];
}
