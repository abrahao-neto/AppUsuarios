import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.component.html',
  styleUrls: ['./autenticar.component.css']
})
export class AutenticarComponent {


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

  }


}





