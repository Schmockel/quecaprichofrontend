import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CategoriaProduto } from 'src/domain/entities/categoria-produto';
import { Produto } from 'src/domain/entities/produto';
import { ProdutoService } from 'src/providers/services/produto.service';
import { UtilProvider } from 'src/providers/tools/util.tool';
import { AdicionarProdutoPage } from '../../../components/modals/produto/adicionar/adicionar.page';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  textoPesquisa: string = "";
  exibirlistaProdutos: boolean = false;
  listaProdutos: Produto[] = [];
  constructor(private router: Router, private util: UtilProvider, private produtoService: ProdutoService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    document.getElementById("rowListaProdutos").style.height = `${window.innerHeight - 56 - 79}px`;

    let loading = await this.util.CriarLoading();

    for (let i = 0; i < 10; i++) {

      let produto = new Produto();
      produto.Nome = `Produto ${i}`;
      produto.Valor = 240.00 + i;
      produto.CategoriaProduto = new CategoriaProduto();
      produto.CategoriaProduto.Nome = "Categoria " + i;
      this.listaProdutos.push(produto);
    }

    // this.produtoService.ObterTodos()
    //   .then((res: Produto[]) => {
    //     this.listaProdutos = res;

    //     if (!res)
    //       this.exibirlistaProdutos = false;

    //     this.util.DismissLoading(loading);
    //   });

    this.util.DismissLoading(loading);
    this.exibirlistaProdutos = true;

    // this.produtoService.ObterTodos()
    //   .then(async (res: Produto[]) => {
    //     console.log(res);

    //     if (!res) {
    //       this.util.DismissLoading(loading);
    //       return;
    //     }
    //     this.exibirlistaProdutos = true;
    //     this.listaProdutos = res;
    //     this.util.DismissLoading(loading);
    //   })
    //   .catch(() => {
    //     this.util.DismissLoading(loading);
    //     this.util.ToastError("Não foi possível obter a lista de produtos");
    //   })
  }

  async pesquisar() {
    this.listaProdutos = [];

    if (!this.textoPesquisa.trim()) {
      let loading = await this.util.CriarLoading();
      this.listaProdutos = await this.produtoService.ObterTodos();
      this.exibirlistaProdutos = true;

      this.util.DismissLoading(loading);
      return;
    }

    let loader = await this.util.CriarLoading();
    this.produtoService.Pesquisar(this.textoPesquisa)
      .then((res: Produto[]) => {
        if (!res.length) {
          this.exibirlistaProdutos = false;
          this.util.DismissLoading(loader);
          return;
        }

        this.listaProdutos = res;
        this.exibirlistaProdutos = true;
        this.util.DismissLoading(loader);
      })
      .catch(() => {
        this.util.DismissLoading(loader);
      });
  }

  voltar() {
    this.router.navigateByUrl("home");
  }

  async adicionar() {
    const modal = await this.modalCtrl.create({
      component: AdicionarProdutoPage,
      componentProps: {},
      cssClass: 'adicionar-page-class'
    });

    await modal.present();

    modal.onWillDismiss()
      .then((res) => {
        if (res && res.data)
          this.listaProdutos.push(res.data.Produto);
      })
      .catch(() => { });

  }
}
