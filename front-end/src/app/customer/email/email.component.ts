import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiProductsAllService } from '../services/api-products-all.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  title = 'envioCorreos';
  datos:FormGroup;
  /*Email: Detalles del carrito del cliente */

  constructor(private httpclient: HttpClient, private productsAllService: ApiProductsAllService, public dialogRef: MatDialogRef<EmailComponent>, private formBuilder: FormBuilder){
    this.datos = new FormGroup ({
      correo: new FormControl('',[Validators.required, Validators.email]),
      asunto: new FormControl('',Validators.required),
      mensaje: new FormControl('',Validators.required)
    })

    this.datos = this.formBuilder.group({
      correo: '',
      asunto: '',
      mensaje: ''
    });
  }

  ngOnInit(): void {
      
  }

  /*Cerrar la ventana */
  closeModal(): void {
    this.dialogRef.close();
  }


  envioCorreo(){
    let params = {
      email: this.datos.value.correo,
      asunto: this.datos.value.asunto,
      mensaje: this.datos.value.mensaje
    }
    console.log(params);
    
    this.httpclient.post('http://localhost:3001/correo', params).subscribe(resp=>{
      console.log(resp); 
    })
  }

}
