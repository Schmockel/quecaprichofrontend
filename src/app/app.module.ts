import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UtilProvider } from './providers/tools/util.tool';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleMaskDirective, SimpleMaskModule, SimpleMaskPipe } from 'ngx-ion-simple-mask';
import { DetalhesPage } from './components/modals/cliente/detalhes/detalhes.page';
import { AdicionarPage } from './components/modals/cliente/adicionar/adicionar.page';

@NgModule({
  declarations: [AppComponent, DetalhesPage, AdicionarPage],
  entryComponents: [],
  imports: [CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SimpleMaskModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UtilProvider],
  bootstrap: [AppComponent],
})
export class AppModule { }
