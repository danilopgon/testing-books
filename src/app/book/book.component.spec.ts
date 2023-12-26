import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { BookService } from '../services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Book } from '../models/book.model';
import { of } from 'rxjs';

const bookList: Book[] = [
  {
    id: '0',
    name: 'Book 1',
    author: 'Author name 1',
    isbn: '165464576456',
    description: 'Book Description 1',
    photoUrl: '/assets/img/book.png',
    price: 8,
  },
  {
    id: '1',
    name: 'Book 2',
    author: 'Author name 2',
    isbn: '265464576456',
    description: 'Book Description 2',
    photoUrl: '/assets/img/book.png',
    price: 10,
  },
  {
    id: '2',
    name: 'Book 3',
    author: 'Author name 3',
    isbn: '365464576456',
    description: 'Book Description 3',
    photoUrl: '/assets/img/book.png',
    price: 15,
  },
  {
    id: '3',
    name: 'Book 4',
    author: 'Author name 4',
    isbn: '465464576456',
    description: 'Book Description 4',
    photoUrl: '/assets/img/book.png',
    price: 22,
  },
];

let bookService: BookService;

const book: Book = {
  name: '',
  author: '',
  isbn: '',
};

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [BookComponent],
      providers: [BookService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bookService = TestBed.inject(BookService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBookInfo should return a book', () => {
    spyOn(bookService, 'updateBook').and.callFake(() => {
      return of(book);
    });

    component.book = book;
    component.getBookInfo();

    expect(component.book).toEqual(book);
  });

  it('updateBook should return a book', () => {
    spyOn(bookService, 'updateBook').and.callFake(() => {
      return of(book);
    });

    component.book = book;
    component.updateBook();

    expect(component.book).toEqual(book);
  });

  it('deleteBook should return a book', () => {
    spyOn(bookService, 'deleteBook').and.callFake(() => {
      return of(book);
    });

    component.book = book;
    component.deleteBook();

    expect(component.book).toEqual(book);
  });
});
