import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/domain/entities/usuario';
import { AuthService } from 'src/providers/services/auth.service';
import { UtilProvider } from 'src/providers/tools/util.tool';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  login: string;
  senha: string;

  constructor(private util: UtilProvider, private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  async logar() {
    if (!this.login || !this.senha) {
      this.util.ToastError("Por favor, informe o e-mail e a senha!");
      return;
    }

    let loader = await this.util.CriarLoading();

    let usuarioLogin = new Usuario();
    usuarioLogin.Email = this.login;
    usuarioLogin.Senha = this.senha;

    await this.authService.Logar(usuarioLogin)
      .then((result) => {
        if (!result) {
          this.util.DismissLoading(loader);
          this.util.ToastError("Login ou senha inválidos!");
          return;
        }

        this.util.DismissLoading(loader);
        this.router.navigateByUrl("home");
      })
      .catch((err) => {
        this.util.DismissLoading(loader);
        this.util.ToastError("Ocorreu um erro inesperado!");
      })
  }

}
