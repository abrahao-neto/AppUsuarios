import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  //atributos
  isLoggedIn: boolean = false;


  nome_usuario: string = '';
  email_usuario: string = '';


  //construtor
  constructor() {
    let auth = localStorage.getItem('auth_usuario');
    //verificando se o usuário está autenticado
    if (auth != null) {
      let usuario = JSON.parse(localStorage.getItem('auth_usuario') as string).usuario;
      //capturando os dados do usuário autenticado
      this.isLoggedIn = true;
      this.nome_usuario = usuario.nome;
      this.email_usuario = usuario.email;
    }
  }


  //função para realizar o logout do usuário
  logout(): void {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      //apagar o conteudo da local storage
      localStorage.removeItem('auth_usuario');
      //redirecionar para a página de autenticação
      window.location.href = '/autenticar';
    }
  }


}




