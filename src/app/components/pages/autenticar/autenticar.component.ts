import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.component.html',
  styleUrls: ['./autenticar.component.css']
})
export class AutenticarComponent {


  //atributos
  mensagem_erro: string = '';


  //construtor
  constructor(
    private httpClient: HttpClient //injeção de dependência
  ) {
    //verificando se usuário está autenticado
    if (localStorage.getItem('auth_usuario') != null) {
      window.location.href = '/consultar-produtos';
    }
  }


  //construindo o formulário
  formAutenticar = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  });


  //capturar os erros de validação do formulário
  get form(): any {
    return this.formAutenticar.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit(): void {


    this.httpClient.post(
      environment.apiUsuarios + "/api/Autenticar",
      this.formAutenticar.value
    ).
      subscribe({
        next: (data: any) => {
          //salvar os dados na local storage
          localStorage.setItem('auth_usuario', JSON.stringify(data));
          //redirecionando o usuário
          window.location.href = '/consultar-produtos';
        },
        error: (e) => {
          this.mensagem_erro = e.error.error;
        }
      })
  }


}




