import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { AutenticarComponent } from './components/pages/autenticar/autenticar.component';
import { CriarContaComponent } from './components/pages/criar-conta/criar-conta.component';
import { RecuperarSenhaComponent } from './components/pages/recuperar-senha/recuperar-senha.component';
import { CadastrarProdutosComponent } from './components/pages/cadastrar-produtos/cadastrar-produtos.component';
import { ConsultarProdutosComponent } from './components/pages/consultar-produtos/consultar-produtos.component';
import { EditarProdutosComponent } from './components/pages/editar-produtos/editar-produtos.component';
import { CadastrarCategoriasComponent } from './components/pages/cadastrar-categorias/cadastrar-categorias.component';
import { ConsultarCategoriasComponent } from './components/pages/consultar-categorias/consultar-categorias.component';
import { EditarCategoriasComponent } from './components/pages/editar-categorias/editar-categorias.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AutenticarComponent,
    CriarContaComponent,
    RecuperarSenhaComponent,
    CadastrarProdutosComponent,
    ConsultarProdutosComponent,
    EditarProdutosComponent,
    CadastrarCategoriasComponent,
    ConsultarCategoriasComponent,
    EditarCategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




