import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CategoriaProduto } from 'src/domain/entities/categoria-produto';
import { Produto } from 'src/domain/entities/produto';
import { CategoriaProdutoService } from 'src/providers/services/categoria-produto.service';
import { ClienteService } from 'src/providers/services/cliente.service';
import { ProdutoService } from 'src/providers/services/produto.service';
import { UtilProvider } from 'src/providers/tools/util.tool';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})

export class AdicionarProdutoPage {
  public formAdicionarProduto: FormGroup;
  eventoSubmit: boolean = false;
  produto: Produto = new Produto();
  teste: string;
  listaCategorias: CategoriaProduto[] = [];
  categoriaSelecionadaId: number;
  constructor(private util: UtilProvider, private router: Router,
    private clienteService: ClienteService, private formBuilder: FormBuilder, private modalCtrl: ModalController, private produtoService: ProdutoService, private categoriaProdutoService: CategoriaProdutoService) {
    this.formAdicionarProduto = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.maxLength(100),
          Validators.required
        ]],
      valor: [
        '',
        [
          Validators.maxLength(100),
          Validators.required
        ]],
      categoria: [
        '',
        [
          Validators.required
        ]]
    });
  }

  errorMessages = {
    nome: [
      { type: 'required', message: 'O Nome não pode estar vazio' },
    ],
    valor: [
      { type: 'required', message: 'O Valor não pode estar vazio' },
    ],
    categoria: [
      { type: 'required', message: 'A categoria não pode estar vazio' },
    ]
  };

  get errorControl() {
    return this.formAdicionarProduto.controls;
  }

  voltar() {
    this.modalCtrl.dismiss();
  }

  ionViewWillEnter() {
    this.categoriaProdutoService.ObterTodos()
      .then((res: CategoriaProduto[]) => {
        console.log(res);
        if (res) {
          this.listaCategorias = res;
          this.categoriaSelecionadaId = res[0].CategoriaProdutoId;
        }
      })
      .catch(() => {
        this.util.AlertToast("Não foi possível obter as Categorias de Produtos");
      })
  }

  changeCategoria(event: any) {
    console.log(event);
  }

  clickSelecionarCategoria(categoria) {
    console.log(categoria);
  }

  adicionarImagem() {
    let _url = "";
    let formData = new FormData();
    // formData.append("base64img", imagem);
  }

  async cadastrar() {

    //#region Validações de campos
    this.eventoSubmit = true;
    if (!this.formAdicionarProduto.valid)
      return;
    //#endregion

    this.eventoSubmit = false;

    let loader = await this.util.CriarLoading();

    //#region Preencher cliente
    this.produto.Nome = this.formAdicionarProduto.controls.nome.value;
    this.produto.Valor = this.formAdicionarProduto.controls.valor.value;
    this.produto.ProdutoFotos = this.formAdicionarProduto.controls.valor.value;
    //#endregion

    await this.produtoService.Adicionar(this.produto)
      .then(() => {
        this.util.DismissLoading(loader);
        this.router.navigateByUrl("clientes");
        this.formAdicionarProduto.reset();
        this.modalCtrl.dismiss({ Cliente: this.produto })
      })
      .catch(() => {
        this.formAdicionarProduto.reset();
        this.util.ToastError("Ocorreu um erro inesperado!");
      })

  }
}
