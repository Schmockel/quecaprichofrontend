import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UtilProvider } from '../providers/tools/util.tool';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { DetalhesPage } from '../components/modals/cliente/detalhes/detalhes.page';
import { AdicionarPage as AdicionarClienteModalPage } from '../components/modals/cliente/adicionar/adicionar.page';
import { AdicionarProdutoPage as AdicionarProdutoModalPage } from 'src/components/modals/produto/adicionar/adicionar.page';

@NgModule({
  declarations: [AppComponent, DetalhesPage, AdicionarClienteModalPage, AdicionarProdutoModalPage],
  entryComponents: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SimpleMaskModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UtilProvider],
  bootstrap: [AppComponent],
})
export class AppModule { }
