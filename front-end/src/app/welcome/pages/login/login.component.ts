import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  person!:FormGroup;

  constructor(private fb:FormBuilder){
    this.crearformulario();
  }

  get correoNovalid(){
    return this.person.get('correo')?.invalid && this.person.get('correo')?.touched
  }
  get contrasenaNovalid(){
    return this.person.get('contrasena')?.invalid && this.person.get('contrasena')?.touched
  }

  crearformulario(){
    this.person=this.fb.group({

      correo:['', [Validators.required, Validators.email]],
      contrasena:['', [Validators.required]]

    })

  }

  iniciarSesion(){
    if (this.person.invalid){
      return Object.values(this.person.controls).forEach(control=>{
        control.markAllAsTouched();
      }) 
    }else{
      console.log(this.person);

    }
    this.person.reset();
  }

}
