import { DashboardInfoGeneralData, DashboardInfoMostRentedBooks } from './data/dashboard.info';
import { BookPage } from './data/book.page';
import { Book } from './data/book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = "http://localhost:8080/v1/books"

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"]
    })
  }

  handleError(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book)
      .pipe(
        map(obj => obj), 
        catchError((e) =>
          this.handleError(e)
        )
      )
  }

  read(): Observable<BookPage> {
    return this.http.get<BookPage>(this.baseUrl)
  }

  getDashboardInfoPie(): Observable<DashboardInfoGeneralData> {
    const url = `${this.baseUrl}/dashboard/pie`
    return this.http.get<DashboardInfoGeneralData>(url)
  }

  getDashboardInfoBar(): Observable<DashboardInfoMostRentedBooks[]> {
    const url = `${this.baseUrl}/dashboard/bar`
    return this.http.get<DashboardInfoMostRentedBooks[]>(url)
  }

  // readById(id: string): Observable<Book> {
  //   const url = `${this.baseUrl}/${id}`
  //   return this.http.get<Book>(url)
  //     .pipe(
  //       map(obj => obj), 
  //       catchError((e) => 
  //         this.handleError(e)
  //       )
  //     )
  // }

  // update(Book: Book): Observable<Book> {
  //   const url = `${this.baseUrl}/${Book.id}`
  //   return this.http.put<Book>(url, Book)
  //     .pipe(
  //       map(obj => obj), 
  //       catchError((e) => 
  //         this.handleError(e)
  //       )
  //     )
  // }

  // delete(id: string): Observable<Book> {
  //   const url = `${this.baseUrl}/${id}`
  //   return this.http.delete<Book>(url)
  //     .pipe(
  //       map(obj => obj), 
  //       catchError((e) => 
  //         this.handleError(e)
  //       )
  //     )
  // }
}
