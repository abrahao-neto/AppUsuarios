import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent implements OnInit {


  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
  categorias: any[] = [];
  httpHeaders = new HttpHeaders();


  //construtor
  constructor(
    private httpClient: HttpClient, //injeção de dependência
    private activatedRoute: ActivatedRoute //injeção de dependência
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


    let idProduto = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.httpClient.get(
      environment.apiProdutos + "/api/Produtos/" + idProduto,
      { headers: this.httpHeaders }
    ).
      subscribe({
        next: (data: any) => {
          this.formEditarProduto.patchValue(data);
          this.formEditarProduto.controls.idCategoria.setValue(data.categoria.idCategoria);
        }
      })
  }


  //construindo o formulário
  formEditarProduto = new FormGroup({
    idProduto: new FormControl('', []),
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
    idCategoria: new FormControl('', [Validators.required])
  });


  //capturar os erros de validação do formulário
  get form(): any {
    return this.formEditarProduto.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit(): void {


    this.mensagem_sucesso = '';
    this.mensagem_erro = '';


    this.httpClient.put(
      environment.apiProdutos + "/api/Produtos",
      this.formEditarProduto.value,
      { headers: this.httpHeaders }
    ).
      subscribe({
        next: (data: any) => {
          this.mensagem_sucesso = "Produto " + data.nome + ", atualizado com sucesso!";
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
