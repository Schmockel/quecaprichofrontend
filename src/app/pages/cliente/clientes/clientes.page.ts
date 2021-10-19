import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AdicionarPage } from 'src/app/components/modals/cliente/adicionar/adicionar.page';
import { DetalhesPage } from 'src/app/components/modals/cliente/detalhes/detalhes.page';
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
  constructor(private clienteService: ClienteService, private util: UtilProvider, private router: Router,
    private alertController: AlertController, private modalCtrl: ModalController) { }

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
    if (!this.textoPesquisa || !this.textoPesquisa.trim()) {
      let loading = await this.util.CriarLoading();
      this.listaClientes = await this.clienteService.ObterTodos();
      this.exibirlistaClientes = true;

      this.util.DismissLoading(loading);
      return;
    }

    this.textoPesquisa = this.textoPesquisa.trim();
    let loading = await this.util.CriarLoading();

    try {
      const listaClientes = await this.clienteService.Pesquisar(this.textoPesquisa);

      if (!listaClientes.length) {
        this.listaClientes = [];
        this.util.DismissLoading(loading);
        this.exibirlistaClientes = false;
        return;
      }

      this.exibirlistaClientes = true;
      this.listaClientes = listaClientes;
      this.util.DismissLoading(loading);
    } catch {
      this.util.DismissLoading(loading);
      this.util.ToastError("Não foi possível pesquisar os clientes");
    }
  }

  async adicionar(clienteId: number) {
    const modal = await this.modalCtrl.create({
      component: AdicionarPage,
      componentProps: {},
      cssClass: 'adicionar-page-class'
    });

    await modal.present();

    modal.onWillDismiss()
      .then((res) => {
        if (res && res.data)
          this.listaClientes.push(res.data.Cliente);
      })
      .catch(() => { });

  }

  async detalhes(clienteId: number) {
    const modal = await this.modalCtrl.create({
      component: DetalhesPage,
      componentProps: { clienteId: clienteId },
      cssClass: 'detalhes-page-class'
    });

    await modal.present();

    modal.onWillDismiss()
      .then((res) => {
        this.listaClientes[this.listaClientes.findIndex(c => c.ClienteId == res.data.Cliente.ClienteId)] = res.data.Cliente;
      })
      .catch(() => { });

  }

  async remover(clienteId: number) {
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
              })
          }
        }
      ]
    });

    await alert.present();
  }

  RemoverClienteListaFront(clienteId: number) {
    this.listaClientes = this.listaClientes.filter(c => (c as any).ClienteId != clienteId);
  }

  voltar() {
    this.router.navigateByUrl("home");
  }
}
