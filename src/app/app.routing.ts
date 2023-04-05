import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { AutenticarComponent } from "./components/pages/autenticar/autenticar.component";
import { CriarContaComponent } from "./components/pages/criar-conta/criar-conta.component";
import { RecuperarSenhaComponent } from "./components/pages/recuperar-senha/recuperar-senha.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'autenticar' },
  { path: 'autenticar', component: AutenticarComponent },
  { path: 'criar-conta', component: CriarContaComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



