import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent {


  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';


  //construtor
  constructor(
    private httpClient: HttpClient //injeção de dependência
  ) {
  }


  //construindo o formulário
  formCriarConta = new FormGroup({
    nome: new FormControl('',
      [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ]+([ '-][a-zA-ZÀ-ÿ]+)*$/)]),
    email: new FormControl('',
      [Validators.required, Validators.email]),
    telefone: new FormControl('',
      [Validators.required, Validators.pattern(/^\d{11}$/)]),
    senha: new FormControl('',
      [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/~`]).{8,}$/)]),
    senhaConfirmacao: new FormControl('',
      [Validators.required])
  });


  //capturar os erros de validação do formulário
  get form(): any {
    return this.formCriarConta.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit(): void {


    this.mensagem_sucesso = '';
    this.mensagem_erro = '';


    this.httpClient.post(
      environment.apiUsuarios + "/api/CriarConta",
      this.formCriarConta.value)
      .subscribe({
        next: (data: any) => { //capturar resposta de sucesso.
          this.mensagem_sucesso = data.message;
          this.formCriarConta.reset(); //limpar o formulário
        },
        error: (e) => { //capturar resposta de erro.
          this.mensagem_erro = e.error.error;
        }
      })
  }


}




