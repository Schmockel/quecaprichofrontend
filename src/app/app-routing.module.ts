import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('../pages/cliente/clientes/clientes.module').then(m => m.ClientesPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('../pages/produto/produtos/produtos.module').then(m => m.ProdutosPageModule)
  },
  {
    path: 'produtos/detalhes/:produto_id',
    loadChildren: () => import('../pages/produto/detalhes/detalhes.module').then(m => m.DetalhesPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
