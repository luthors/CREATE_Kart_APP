import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { productsInterface } from 'src/app/admin/interfaces/products-interfaces.module';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit{

  form: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      /*Validaciones */
      title: ['', Validators.required],
      descrip: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    })
  }

  ngOnInit(): void {
      
  }

  addProduct(): void {
    /* console.log(this.form);
    console.log(this.form.value.title); */
    
    console.log('Add product');
    const product: productsInterface = {
    title: this.form.value.title,
    descrip: this.form.value.description,
    price: this.form.value.price,
    stock: this.form.value.stock
    }
    console.log(product);
    
  }

}
