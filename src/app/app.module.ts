import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { AutenticarComponent } from './components/pages/autenticar/autenticar.component';
import { CriarContaComponent } from './components/pages/criar-conta/criar-conta.component';
import { RecuperarSenhaComponent } from './components/pages/recuperar-senha/recuperar-senha.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AutenticarComponent,
    CriarContaComponent,
    RecuperarSenhaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }





