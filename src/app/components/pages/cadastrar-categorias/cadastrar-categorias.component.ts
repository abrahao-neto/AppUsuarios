import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-cadastrar-categorias',
  templateUrl: './cadastrar-categorias.component.html',
  styleUrls: ['./cadastrar-categorias.component.css']
})
export class CadastrarCategoriasComponent {

  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  httpHeaders = new HttpHeaders();

  //construtor
  constructor(
    private httpClient: HttpClient //injeção de dependência
  ) {
    //capturar o token do usuário autenticado
    var auth = JSON.parse(localStorage.getItem('auth_usuario') as string);
    this.httpHeaders = new HttpHeaders({ 'Authorization' : 'Bearer ' + auth.token });
  }

  //construindo o formulário
  formCadastrarCategoria = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required])
  });

  //capturar os erros de validação do formulário
  get form(): any {
    return this.formCadastrarCategoria.controls;
  }

  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    this.httpClient.post(
      environment.apiProdutos + "/api/Categorias",
      this.formCadastrarCategoria.value,
      { headers: this.httpHeaders }
    ).
      subscribe({
        next: (data: any) => {
          this.mensagem_sucesso = "Categoria " + data.nome + ", cadastrada com sucesso!";
          this.formCadastrarCategoria.reset();
        },
        error: (e) => {
          if (e.status == 401)
            this.mensagem_erro = "Acesso não autorizado.";
          else
            this.mensagem_erro = e.error;
        }
      })
  }
}
