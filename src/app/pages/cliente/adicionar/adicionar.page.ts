import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/domain/entities/cliente';
import { Endereco } from 'src/app/domain/entities/endereco';
import { Telefone } from 'src/app/domain/entities/telefone';
import { ClienteService } from 'src/app/providers/services/cliente.service';
import { UtilProvider } from 'src/app/providers/tools/util.tool';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {
  cliente: Cliente = new Cliente();
  telefone: Telefone;
  endereco: Endereco;
  constructor(private util: UtilProvider, private router: Router, private clienteService: ClienteService) { }

  ngOnInit() {
  }

  voltar() {
    this.router.navigateByUrl("clientes");
  }

  async cadastrar() {
    // this.cliente.Telefones.push(this.telefone)
    // this.cliente.Enderecos.push(this.endereco)

    let loader = await this.util.CriarLoading();
    await this.clienteService.Adicionar(this.cliente)
      .then(() => {
        this.util.DismissLoading(loader);
        this.router.navigateByUrl("clientes");
      })
      .catch(() => {
        this.util.ToastError("Ocorreu um erro inesperado!");
      })

  }
}
