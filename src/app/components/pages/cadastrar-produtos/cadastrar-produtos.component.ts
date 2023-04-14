import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent implements OnInit {

  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
  categorias: any[] = [];
  httpHeaders = new HttpHeaders();

  //construtor
  constructor(
    private httpClient: HttpClient //injeção de dependência
  ) {
    //capturar o token do usuário autenticado
    var auth = JSON.parse(localStorage.getItem('auth_usuario') as string);
    this.httpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + auth.token });
  }

  ngOnInit(): void {
    this.httpClient.get(
      environment.apiProdutos + "/api/Categorias",
      { headers: this.httpHeaders })
      .subscribe({
        next: (data) => {
          this.categorias = data as any[];
        }
      })
  }

  //construindo o formulário
  formCadastrarProduto = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
    idCategoria: new FormControl('', [Validators.required])
  });

  //capturar os erros de validação do formulário
  get form(): any {
    return this.formCadastrarProduto.controls;
  }

  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    this.httpClient.post(
      environment.apiProdutos + "/api/Produtos",
      this.formCadastrarProduto.value,
      { headers: this.httpHeaders }
    ).
      subscribe({
        next: (data: any) => {
          this.mensagem_sucesso = "Produto " + data.nome + ", cadastrado com sucesso!";
          this.formCadastrarProduto.reset();
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
