import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/domain/entities/cliente';
import { ClienteService } from 'src/app/providers/services/cliente.service';
import { UtilProvider } from 'src/app/providers/tools/util.tool';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  cliente: Cliente = new Cliente();

  constructor(private route: ActivatedRoute, private util: UtilProvider, private router: Router, private clienteService: ClienteService) { }

  async ngOnInit() {
    let clienteIdObtido = parseInt(this.route.snapshot.paramMap.get("cliente_id"));

    let loading = await this.util.CriarLoading();
    this.cliente = await this.clienteService.ObterPorId(clienteIdObtido);

    console.log(this.cliente);

    this.util.DismissLoading(loading);

  }

  async ngAfterViewInit() {

  }

  salvar() {

  }

  voltar() {
    console.log("caraio");

    this.router.navigateByUrl("clientes");
  }


}
