import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly base_url = environment.api_url;
  private readonly http = inject(HttpClient);

  

  addBook(book: Book){
    return this.http.post<Book>(`${this.base_url}/books`, book)
  }

  getAllBooks(){
    return this.http.get<Book>(`${this.base_url}/books`);
  }

  editBook(id: string, book: Book){
    return this.http.put<Book>(`${this.base_url}/books/${ id }`, book);
  }

  deleteBook(id: string){

  }

  findByIdOrTitle(id: string){
    return this.http.get<Book>(`${this.base_url}/books/search/${id}`);
  }

}
