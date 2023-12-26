import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  providers: [BookService, HttpClientModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  bookId: string;
  book: Book;
  newBook: Book;

  form = new FormGroup({
    author: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  constructor(
    public readonly bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id');
      this.getBookInfo();
    });
  }

  getBookInfo() {
    this.bookService.getBookById(this.bookId).subscribe((resp: Book) => {
      this.book = resp;
    });
  }

  updateBook() {
    this.newBook = {
      id: this.book.id,
      isbn: this.book.isbn,
      photoUrl: this.book.photoUrl,

      author: this.form.get('author').value,
      description: this.form.get('description').value,
      name: this.form.get('name').value,
      price: this.form.get('price').value,
    };
    this.bookService.updateBook(this.newBook).subscribe((resp: Book) => {
      this.book = resp;
    });

    this.form.get('author').setValue('');
    this.form.get('description').setValue('');
    this.form.get('name').setValue('');
    this.form.get('price').setValue('');
  }

  deleteBook() {
    this.bookService.deleteBook(this.bookId).subscribe((resp: Book) => {
      this.book = resp;
    });

    this.form.get('author').setValue('');
    this.form.get('description').setValue('');
    this.form.get('name').setValue('');
    this.form.get('price').setValue('');
  }
}
