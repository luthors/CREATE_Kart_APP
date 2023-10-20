import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  persona = {
    tip_doc: '',
    num_doc:'',
    nombre: '',
    apellido:'',
    correo: '',
    contrasena:'',
    passConf:'',
    role:{
      default: 'cliente'
    }
  }

  procesar(){
    console.log(this.persona)
  }

}
