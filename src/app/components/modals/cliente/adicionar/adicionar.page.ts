import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/domain/entities/cliente';
import { ClienteService } from 'src/app/providers/services/cliente.service';
import { UtilProvider } from 'src/app/providers/tools/util.tool';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})

export class AdicionarPage implements OnInit {
  public formAdicionarCliente: FormGroup;
  eventoSubmit: boolean = false;
  cliente: Cliente = new Cliente();
  teste: string;

  constructor(private util: UtilProvider, private router: Router,
    private clienteService: ClienteService, private formBuilder: FormBuilder, private modalCtrl: ModalController) {
    this.formAdicionarCliente = this.formBuilder.group({
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

  errorMessages = {
    nome: [
      { type: 'required', message: 'O Nome não pode estar vazio' },
    ],
    email: [
      { type: 'required', message: 'O Email não pode estar vazio' },
    ],
    cpf: [
      { type: 'required', message: 'O CPF não pode estar vazio' },
    ],
    celular: [
      { type: 'required', message: 'O Telefone Celular não pode estar vazio' },
    ],
    fixo: [
      { type: 'required', message: 'O Telefone Fixo não pode estar vazio' },
    ],
    endereco: [
      { type: 'required', message: 'O Endereco não pode estar vazio' },
    ]
  };

  ngOnInit() {
  }

  get errorControl() {
    return this.formAdicionarCliente.controls;
  }

  voltar() {
    this.modalCtrl.dismiss();
  }

  async cadastrar() {

    //#region Validações de campos
    this.eventoSubmit = true;
    if (!this.formAdicionarCliente.valid)
      return;
    //#endregion

    this.eventoSubmit = false;

    let loader = await this.util.CriarLoading();

    //#region Preencher cliente
    this.cliente.Nome = this.formAdicionarCliente.controls.nome.value;
    this.cliente.Email = this.formAdicionarCliente.controls.email.value;
    this.cliente.CPF = this.formAdicionarCliente.controls.cpf.value;
    this.cliente.TelefoneCelular = this.formAdicionarCliente.controls.celular.value;
    this.cliente.TelefoneFixo = this.formAdicionarCliente.controls.fixo.value;
    this.cliente.Endereco = this.formAdicionarCliente.controls.endereco.value;
    //#endregion

    await this.clienteService.Adicionar(this.cliente)
      .then(() => {
        this.util.DismissLoading(loader);
        this.router.navigateByUrl("clientes");
        this.formAdicionarCliente.reset();
        this.modalCtrl.dismiss({ Cliente: this.cliente })
      })
      .catch(() => {
        this.formAdicionarCliente.reset();
        this.util.ToastError("Ocorreu um erro inesperado!");
      })

  }
}
