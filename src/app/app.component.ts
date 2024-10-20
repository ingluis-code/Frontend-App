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
  edit = false;
  idBook: string = "";

  constructor() {
    this.bookForm = this.fb.group({
      title: [''],
    });
  }

  ngOnInit(){
    this.getAllBooks();
  }

  addOrEditBook(){
    if(!this.edit){
        this.addBook();
    }else{
      this.editBook();
    }

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
            this.getAllBooks();
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
     error: (error) => {
      Swal.fire({
        title: 'Error!',
        text: error.error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
   
     }
   });
 }

 editBook(){

   if(this.bookForm.valid){

    const updateBook = this.bookForm.getRawValue() as Book;

    this.bookService.editBook(this.idBook, updateBook).subscribe({
      next: (response) => {
         console.log(response)
         Swal.fire({
           title: 'Exito',
           text: response.message,
           icon: 'success',
           confirmButtonText: 'Aceptar',
           showConfirmButton: true
         });
         this.edit = false;
         this.getAllBooks();
      },
      error: (error) => {
         console.log(error.error.message)
         this.edit = false;
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

 loadBook(id: string){
  this.bookService.findByIdOrTitle(id).subscribe({
    next: (response) => {
       console.log(response);
       this.bookForm.patchValue(response.data)
       this.edit = true;
       this.idBook = id;
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

 }

 findByIdOrTitle(){

 }

 deleteBook(id: string){

  Swal.fire({
    title: '¿Estas seguro/a?',
    text: '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, Borrar!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true,
  }).then((result) => {

    if (result.isConfirmed) {
      this.bookService.deleteBook(id).subscribe({
        next: (response) => {
           console.log(response);
           Swal.fire({
            title: 'Exito',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          });
          this.getAllBooks();
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
    }
  });


}


}
