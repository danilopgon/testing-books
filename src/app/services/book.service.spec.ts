import { BookService } from './book.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';
import swal from 'sweetalert2';
import { RouterTestingModule } from '@angular/router/testing';

const listBook: Book[] = [
  {
    id: '0',
    name: '',
    author: '',
    isbn: '',
    price: 15,
    amount: 2,
  },
  {
    id: '1',
    name: '',
    author: '',
    isbn: '',
    price: 20,
    amount: 1,
  },
  {
    id: '2',
    name: '',
    author: '',
    isbn: '',
    price: 8,
    amount: 7,
  },
];

const book: Book = {
  id: '1',
  name: '',
  author: '',
  isbn: '',
  price: 15,
};

const book2: Book = {
  id: '2',
  name: '',
  author: '',
  isbn: '',
  price: 20,
};

class ComponentTestRoute {}

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let storage = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: ComponentTestRoute },
          { path: 'cart', component: ComponentTestRoute },
          { path: 'book/:id', component: ComponentTestRoute },
        ]),
      ],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);

    storage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key] ? storage[key] : null;
    });

    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => {
        return (storage[key] = value);
      }
    );
  });

  afterAll(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBooksFromCart return empty array when localStorage is empty', () => {
    const listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });

  it('addBookToCart add a book successfully when the list does not exist in the localStorage', () => {
    const toast = {
      fire: () => null,
    } as any;
    const spy1 = spyOn(swal, 'mixin').and.callFake(() => {
      return toast;
    });
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
    service.addBookToCart(book);
    listBook = service.getBooksFromCart();
    service.addBookToCart(book);
    expect(spy1).toHaveBeenCalled();
  });

  it('addBookToCart correctly adds another unit of the same book', () => {
    const toast = {
      fire: () => null,
    } as any;
    const spy1 = spyOn(swal, 'mixin').and.callFake(() => {
      return toast;
    });
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
    service.addBookToCart(book);
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    service.addBookToCart(book);
    expect(listBook.length).toBe(1);
    expect(spy1).toHaveBeenCalled();
  });

  it('addBookToCart correctly adds a new book with different id', () => {
    const toast = {
      fire: () => null,
    } as any;
    const spy1 = spyOn(swal, 'mixin').and.callFake(() => {
      return toast;
    });
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
    service.addBookToCart(book);
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    service.addBookToCart(book2);
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(2);
    expect(spy1).toHaveBeenCalled();
  });

  it('removeBooksFromCart removes the list from the localStorage', () => {
    service.addBookToCart(book);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    service.removeBooksFromCart();
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });

  it('updateAmountBook updates the amount of a book', () => {
    service.addBookToCart(book);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    expect(listBook[0].amount).toBe(1);
    book.amount = 2;
    service.updateAmountBook(book);
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    expect(listBook[0].amount).toBe(2);
  });

  it('updateAmountBook removes the book from the list when the amount is 0', () => {
    service.addBookToCart(book);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    expect(listBook[0].amount).toBe(1);
    book.amount = 0;
    service.updateAmountBook(book);
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });

  //CRUD Methods
  it('getBook return a list of book and does a get method', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      expect(resp).toEqual(listBook);
    });

    const req = httpMock.expectOne(environment.API_REST_URL + '/book.json');
    expect(req.request.method).toBe('GET');

    req.flush(listBook);
  });

  it('updateBook should send the new book to the server and does a put method', () => {
    service.updateBook(book).subscribe((resp: Book) => {
      expect(resp).toEqual(book);
    });

    const req = httpMock.expectOne(
      environment.API_REST_URL + '/book/' + book.id + '.json'
    );
    expect(req.request.method).toBe('PUT');

    req.flush(book);
  });

  it('deleteBook should delete the book from the server and does a delete method', () => {
    service.deleteBook(book.id).subscribe((resp: Book) => {
      expect(resp).toEqual(book);
    });

    const req = httpMock.expectOne(
      environment.API_REST_URL + '/book/' + book.id + '.json'
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(book);
  });
});
