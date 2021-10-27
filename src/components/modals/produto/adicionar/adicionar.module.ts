import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarPageRoutingModule } from './adicionar-routing.module';

import { AdicionarProdutoPage } from './adicionar.page';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    IonicModule,
    AdicionarPageRoutingModule,
    SimpleMaskModule
  ],
  declarations: [AdicionarProdutoPage]
})
export class AdicionarPageModule { }
