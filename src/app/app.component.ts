import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';

  private readonly bookService = inject(BookService);
  books: any = [];

  getAllBooks(){
    this.bookService.getAllBooks()
    .subscribe({
     next: (response) => {
       //this.books.set(response);
       console.log(response)
     },
     error: (err) => {
       console.log('ERROR')
     }
   });
 }

 ngOnInit(){
   this.getAllBooks();
 }
}
