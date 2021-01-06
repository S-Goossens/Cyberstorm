import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsModule } from './products/products.module';
import { RequestService } from './shared/services/request.service';
import { AuthModule } from './auth/auth.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    ProductsModule,
    ShoppingCartModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [RequestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
