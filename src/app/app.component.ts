import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookService } from './services/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Book } from './interfaces/book';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';

  private readonly bookService = inject(BookService);
  private readonly fb = inject(FormBuilder);
  books: any = [];
  bookForm: FormGroup;

  constructor() {
    this.bookForm = this.fb.group({
      title: [''],
    });
  }
  
  addBook(){
     const newBook = this.bookForm.getRawValue() as Book;

     if(this.bookForm.valid){
       this.bookService.addBook(newBook).subscribe({
         next: (response) => {
            console.log(response)
            Swal.fire({
              title: 'Exito',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            });
         },
         error: (error) => {
            console.log(error.error.message)
            Swal.fire({
              title: 'Error!',
              text: error.error.message,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
         }
         
       });

       this.bookForm.reset();
     }

  }

  getAllBooks(){
    this.bookService.getAllBooks()
    .subscribe({
     next: (response) => {
       this.books = response.data
       console.log(this.books)
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
