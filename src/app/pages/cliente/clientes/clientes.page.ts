import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Cliente } from 'src/app/domain/entities/cliente';
import { ClienteService } from 'src/app/providers/services/cliente.service';
import { UtilProvider } from 'src/app/providers/tools/util.tool';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  listaClientes: Cliente[] = [];
  textoPesquisa: string;
  exibirlistaClientes: boolean = false;
  constructor(private clienteService: ClienteService, private util: UtilProvider, private router: Router, private alertController: AlertController) { }

  async ngOnInit() {
    AppComponent.exibirMenuLateral = true;

    let loading = await this.util.CriarLoading();

    this.clienteService.ObterTodos()
      .then(async (res: Cliente[]) => {
        if (!res) {
          this.util.DismissLoading(loading);
          this.exibirlistaClientes = false;
          return;
        }
        this.exibirlistaClientes = true;
        this.listaClientes = res;
        this.util.DismissLoading(loading);
      })
      .catch(() => {
        this.util.DismissLoading(loading);
        this.util.ToastError("Não foi possível obter a lista de clientes");
      })
  }

  async pesquisar() {
    this.textoPesquisa = this.textoPesquisa.trim();
    if (!this.textoPesquisa)
      return;

    let loading = await this.util.CriarLoading();
    this.clienteService.Pesquisar(this.textoPesquisa)
      .then(async (res: Cliente[]) => {
        console.log(res);
        if (!res) {
          console.log("lista vazia");
          this.util.DismissLoading(loading);
          this.exibirlistaClientes = false;
          return;
        }

        this.exibirlistaClientes = true;
        this.listaClientes = res;
        this.util.DismissLoading(loading);
      })
      .catch(() => {
        this.util.DismissLoading(loading);
        this.util.ToastError("Não foi possível pesquisar os clientes");
      })
  }

  detalhes(clienteId: number) {
    this.router.navigateByUrl(`clientes/detalhes/${clienteId}`);

  }

  async remover(clienteId: number) {
    console.log(clienteId);

    let alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Deseja realmente remover o cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: 'Confirmar',
          handler: async () => {
            let loader = await this.util.CriarLoading();

            await this.clienteService.Remover(clienteId)
              .then(() => {
                this.util.AlertToast("Cliente removido com sucesso!");
                alert.dismiss();
                this.util.DismissLoading(loader);

                this.RemoverClienteListaFront(clienteId);
              })
              .catch((err) => {
                this.util.ToastError("Erro ao remover o cliente!");
                alert.dismiss();
                this.util.DismissLoading(loader);
                console.log(err);
              })
          }
        }
      ]
    });

    await alert.present();
  }

  RemoverClienteListaFront(clienteId: number) {
    this.listaClientes = this.listaClientes.filter(c => (c as any).clienteId != clienteId);
  }

  voltar() {
    console.log("caraio");
    this.router.navigateByUrl("home");
  }

}
