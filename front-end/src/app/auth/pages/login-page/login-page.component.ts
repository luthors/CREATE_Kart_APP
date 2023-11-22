import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';



@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private token:string='';
  errorauth!:boolean

  private fb=inject( FormBuilder );
  private authService=inject( AuthService );

  get correoNovalid(){
    return this.myForm.get('email')?.invalid && this.myForm.get('email')?.touched
  }
  get contrasenaNovalid(){
    return this.myForm.get('password')?.invalid && this.myForm.get('password')?.touched
  }

  public myForm = this.fb.group({
    email:    ['', [ Validators.required, Validators.email ] ],
    password: ['', [ Validators.required, Validators.minLength(6) ] ]
  })

  login() {

    if (this.myForm.invalid){
      return Object.values(this.myForm.controls).forEach(control=>{
        control.markAllAsTouched();
      }) 

    }else{
      const { email, password } = this.myForm.value;
      this.authService.login( email, password )
      .subscribe(success => {
        this.errorauth=false;
        this.token=success.toString();
        // console.log("esperando respuesta del back... "+success);
        },err =>{
          this.errorauth=true;
          console.log("hay un problema"+err)
        })
        // console.log(this.myForm.value);
    }    
  }
}
