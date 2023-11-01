import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DestacadosComponent } from './destacados/destacados.component';



@NgModule({
  declarations: [
    HeaderComponent,
    DestacadosComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    DestacadosComponent
  ]
})
export class SharedModule { }
