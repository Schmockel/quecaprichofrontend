import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesPageRoutingModule } from './detalhes-routing.module';

import { DetalhesPage } from './detalhes.page';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    IonicModule,
    DetalhesPageRoutingModule,
    ReactiveFormsModule,
    SimpleMaskModule
  ],
  declarations: [DetalhesPage]
})
export class DetalhesPageModule {}
