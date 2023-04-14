import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css']
})
export class EditarCategoriasComponent implements OnInit {

  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro: string = '';
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
    let idCategoria = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.httpClient.get(
      environment.apiProdutos + "/api/Categorias/" + idCategoria,
      { headers: this.httpHeaders }
    ).
      subscribe({
        next: (data: any) => {
          this.formEditarCategoria.patchValue(data);
        }
      })
  }

  //construindo o formulário
  formEditarCategoria = new FormGroup({
    idCategoria: new FormControl('', []),
    nome: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required])
  });

  //capturar os erros de validação do formulário
  get form(): any {
    return this.formEditarCategoria.controls;
  }

  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    this.httpClient.put(
      environment.apiProdutos + "/api/Categorias",
      this.formEditarCategoria.value,
      { headers: this.httpHeaders }
    ).
      subscribe({
        next: (data: any) => {
          this.mensagem_sucesso = "Categoria " + data.nome + ", atualizada com sucesso!";
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
