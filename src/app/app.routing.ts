import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { AutenticarComponent } from "./components/pages/autenticar/autenticar.component";
import { CriarContaComponent } from "./components/pages/criar-conta/criar-conta.component";
import { RecuperarSenhaComponent } from "./components/pages/recuperar-senha/recuperar-senha.component";
import { CadastrarCategoriasComponent } from "./components/pages/cadastrar-categorias/cadastrar-categorias.component";
import { ConsultarCategoriasComponent } from "./components/pages/consultar-categorias/consultar-categorias.component";
import { EditarCategoriasComponent } from "./components/pages/editar-categorias/editar-categorias.component";
import { CadastrarProdutosComponent } from "./components/pages/cadastrar-produtos/cadastrar-produtos.component";
import { ConsultarProdutosComponent } from "./components/pages/consultar-produtos/consultar-produtos.component";
import { EditarProdutosComponent } from "./components/pages/editar-produtos/editar-produtos.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'autenticar' },
  { path: 'autenticar', component: AutenticarComponent },
  { path: 'criar-conta', component: CriarContaComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'cadastrar-produtos', component: CadastrarProdutosComponent },
  { path: 'consultar-produtos', component: ConsultarProdutosComponent },
  { path: 'editar-produtos/:id', component: EditarProdutosComponent },
  { path: 'cadastrar-categorias', component: CadastrarCategoriasComponent },
  { path: 'consultar-categorias', component: ConsultarCategoriasComponent },
  { path: 'editar-categorias/:id', component: EditarCategoriasComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


