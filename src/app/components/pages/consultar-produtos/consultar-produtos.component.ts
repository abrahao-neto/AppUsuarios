import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-consultar-produtos',
  templateUrl: './consultar-produtos.component.html',
  styleUrls: ['./consultar-produtos.component.css']
})
export class ConsultarProdutosComponent implements OnInit {


  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
  categorias: any[] = [];
  produtos: any[] = [];
  httpHeaders = new HttpHeaders();


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


  formConsultarProdutos = new FormGroup({
    idCategoria: new FormControl('', [Validators.required])
  });


  //capturar os erros de validação do formulário
  get form(): any {
    return this.formConsultarProdutos.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit(): void {


    this.httpClient.get(
      environment.apiProdutos + "/api/Produtos/Categoria/" + this.formConsultarProdutos.value.idCategoria,
      { headers: this.httpHeaders }
    ).
      subscribe({
        next: (data) => {
          this.produtos = data as any[];
        },
        error: (e) => {
          if (e.status == 401)
            this.mensagem_erro = "Acesso não autorizado.";
          else
            this.mensagem_erro = e.error;
        }
      })
  }


  onDelete(idProduto: string): void {
    if (window.confirm('Deseja realmente excluir o produto?')) {
      this.httpClient.delete(
        environment.apiProdutos + "/api/Produtos/" + idProduto,
        { headers: this.httpHeaders })
        .subscribe({
          next: (data: any) => {
            this.mensagem_sucesso = "Produto " + data.nome + ", excluído com sucesso.";
            this.onSubmit();
          },
          error: (e) => {
            this.mensagem_erro = "Não foi possível excluir o produto.";
          }
        })
    }
  }


}
