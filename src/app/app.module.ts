
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { SearchProductsService } from './search-products.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [SearchProductsService], // It is important,
  bootstrap: [AppComponent]
})
export class AppModule { }