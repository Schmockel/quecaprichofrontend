import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/domain/entities/cliente';
import { ClienteService } from 'src/app/providers/services/cliente.service';
import { UtilProvider } from 'src/app/providers/tools/util.tool';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})

export class DetalhesPage implements OnInit {
  @Input() clienteId: string;
  public formDetalhesCliente: FormGroup;
  eventoSubmit: boolean = false;
  clienteIdObtido: number;
  cliente: Cliente = new Cliente();

  constructor(private route: ActivatedRoute, private util: UtilProvider, private router: Router,
    private clienteService: ClienteService, private formBuilder: FormBuilder, private modalCtrl: ModalController) {
    this.formDetalhesCliente = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.maxLength(100),
          Validators.required
        ]],
      email: [
        '',
        [
          Validators.maxLength(100),
          Validators.email,
          Validators.required
        ]],
      cpf: [
        '',
        [
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/),
          Validators.required
        ]],
      endereco: [
        '',
        [
          Validators.maxLength(100),
          Validators.required
        ]],
      celular: [
        '',
        [
          Validators.maxLength(15),
          Validators.pattern(/^\([1-9]{2}\) [0-9]{4,5}-[0-9]{4}$/),
          Validators.required
        ]],
      fixo: [
        '',
        [
          Validators.maxLength(14),
          Validators.pattern(/^\([1-9]{2}\) [0-9]{4}-[0-9]{4}$/),
          Validators.required
        ]],
    });
  }

  get errorControl() {
    return this.formDetalhesCliente.controls;
  }

  async ngOnInit() {
    let loading = await this.util.CriarLoading();
    this.cliente = await this.clienteService.ObterPorId(parseInt(this.clienteId));

    this.formDetalhesCliente.controls.nome.setValue(this.cliente.Nome);
    this.formDetalhesCliente.controls.cpf.setValue(this.cliente.CPF);
    this.formDetalhesCliente.controls.email.setValue(this.cliente.Email);
    this.formDetalhesCliente.controls.endereco.setValue(this.cliente.Endereco);
    this.formDetalhesCliente.controls.celular.setValue(this.cliente.TelefoneCelular);
    this.formDetalhesCliente.controls.fixo.setValue(this.cliente.TelefoneFixo);
    this.util.DismissLoading(loading);

  }

  errorMessages = {
    nome: [
      { type: 'required', message: 'O Nome não pode estar vazio' },
      // { type: 'maxlength', message: 'O Nome deve ter no máximo 100 caracteres' }
    ],
    email: [
      { type: 'required', message: 'O Email não pode estar vazio' },
      // { type: 'pattern', message: 'O Email deve ter no máximo 100 caracteres' }
    ],
    cpf: [
      { type: 'required', message: 'O CPF não pode estar vazio' },
      // { type: 'pattern', message: 'O CPF deve ter no máximo 14 caracteres' }
    ],
    telefone: [
      { type: 'required', message: 'O Telefone não pode estar vazio' },
      {
        // type: 'maxlength', message: 'O Telefone deve ter no máximo 20 caracteres'
      }
    ],
    endereco: [
      { type: 'required', message: 'O Endereco não pode estar vazio' },
      // { type: 'maxlength', message: 'O Endereco deve ter no máximo 100 caracteres' }
    ]
  };

  async salvar() {
    this.eventoSubmit = true;
    if (!this.formDetalhesCliente.valid)
      return;
    //#endregion

    this.eventoSubmit = false;

    this.cliente.Nome = this.formDetalhesCliente.controls.nome.value;
    this.cliente.CPF = this.formDetalhesCliente.controls.cpf.value;
    this.cliente.Email = this.formDetalhesCliente.controls.email.value;
    this.cliente.Endereco = this.formDetalhesCliente.controls.endereco.value;
    this.cliente.TelefoneCelular = this.formDetalhesCliente.controls.celular.value;
    this.cliente.TelefoneFixo = this.formDetalhesCliente.controls.fixo.value;
    this.cliente.ClienteId = parseInt(this.clienteId);

    let loader = await this.util.CriarLoading();

    this.clienteService.Alterar(this.cliente)
      .then(() => {
        this.util.DismissLoading(loader);
        this.modalCtrl.dismiss({ Cliente: this.cliente });
        this.formDetalhesCliente.reset();
      })
      .catch(() => {
        this.formDetalhesCliente.reset();
        this.util.ToastError("Ocorreu um erro inesperado!");
      })

  }

  voltar() {
    // this.router.navigateByUrl("clientes");
    this.modalCtrl.dismiss({ Cliente: this.cliente });
  }


}
