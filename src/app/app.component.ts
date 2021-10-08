import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  //#region Variáveis estáticas
  public static exibirMenuLateral: boolean = false;
  public get exibirMenuLateral(): boolean {
    return AppComponent.exibirMenuLateral;
  }
  //#endregion

  constructor() { }
}
