import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book.service';
import { BookComponent } from './book/book.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, BookComponent],
  imports: [BrowserModule, HttpClientModule, PagesModule, ReactiveFormsModule],
  providers: [BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}
