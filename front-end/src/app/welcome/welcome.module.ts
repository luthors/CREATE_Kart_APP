import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule
  ]
})
export class WelcomeModule { }
