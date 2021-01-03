import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegistrationComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
