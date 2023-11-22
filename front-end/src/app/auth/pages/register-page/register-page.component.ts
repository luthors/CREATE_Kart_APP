import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces';
import { Router } from "@angular/router";//redireccionar a página

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  person!:FormGroup;
  authError!:boolean;
  authService = inject( AuthService );

  constructor(private fb:FormBuilder, private router: Router){//Redireccionar a página: 
    this.crearformulario();
  }

  get tip_docNovalid(){
    return this.person.get('tip_doc')?.invalid && this.person.get('tip_doc')?.touched
  }

  get num_docNovalid(){
    return this.person.get('num_doc')?.invalid && this.person.get('num_doc')?.touched
  }

  get nombreNovalid(){
    return this.person.get('nombre')?.invalid && this.person.get('nombre')?.touched
  }

  get apellidoNovalid(){
    return this.person.get('apellido')?.invalid && this.person.get('apellido')?.touched
  }

  get correoNovalid(){
    return this.person.get('correo')?.invalid && this.person.get('correo')?.touched
  }

  get contrasenaNovalid(){
    return this.person.get('contrasena')?.invalid && this.person.get('contrasena')?.touched
  }

  get passConfNovalid(){
    return this.person.get('passConf')?.invalid && this.person.get('passConf')?.touched
  }

  crearformulario(){
    // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$')
    this.person=this.fb.group({

      tip_doc:['', Validators.required],
      num_doc:['', Validators.required],
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      correo:['', [Validators.required, Validators.email]],
      role:[2],
      contrasena:['', [Validators.required, ]],
      passConf:['', [Validators.required]]

    },{

      Validators:this.passwordIguales('contrasena','passConf')

    })

  }

  registro(){
    let usuario:User;

    this.passNovalido();

      if (this.person.invalid){
        this.authError=false
        return Object.values(this.person.controls).forEach(control=>{
        control.markAllAsTouched();
      })
    }else{
      // this.person
      usuario = {
        "type_doc":this.person.value.tip_doc,
        "doc_number":this.person.value.num_doc,
        "name":this.person.value.nombre,
        "last_name":this.person.value.apellido,
        "email":this.person.value.correo,
        "password":this.person.value.contrasena,
        "id_role":this.person.value.role
      }

      this.authService.register(usuario)
        .subscribe(success => {          
          this.authError=false;
          this.person.reset();           
        },err =>{
          this.authError=true;
        })
        
        
        
        

    }
    // this.person.reset();
  }

  passNovalido(){
    const pass1 = this.person.get('contrasena')?.value;
    const pass2 = this.person.get('passConf')?.value;
    if(pass1 !== pass2){
      return true;
    }else{
      return false;
    }
  }

  passwordIguales(pass1Name:string, pass2Name:string){

    return (formGroup:FormGroup)=>{
      const pass1Control = formGroup.get(pass1Name)
      const pass2Control = formGroup.get(pass2Name)

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual:true})
      }
    }

  }

}
