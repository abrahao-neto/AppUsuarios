import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consultar-categorias',
  templateUrl: './consultar-categorias.component.html',
  styleUrls: ['./consultar-categorias.component.css']
})
export class ConsultarCategoriasComponent implements OnInit {

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

  onDelete(idCategoria: string): void {
    if (window.confirm('Deseja realmente excluir a categoria?')) {
      this.httpClient.delete(
        environment.apiProdutos + "/api/Categorias/" + idCategoria,
        { headers: this.httpHeaders })
        .subscribe({
          next: (data: any) => {
            this.mensagem_sucesso = "Categoria " + data.nome + ", excluída com sucesso.";
            this.ngOnInit();
          },
          error: (e) => {
            this.mensagem_erro = "Não foi possível excluir a categoria.";
          }
        })
    }
  }
}
