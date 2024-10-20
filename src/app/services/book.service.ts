import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly base_url = environment.api_url;
  private readonly http = inject(HttpClient);

  constructor() { }

  getAllBooks(){
    return this.http.get<any>(`${this.base_url}/books`);
  }

}
