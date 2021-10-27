import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarProdutoPage } from './adicionar.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarProdutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarPageRoutingModule {}
