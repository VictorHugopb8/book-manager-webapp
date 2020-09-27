import { CustomerPage } from './data/customer.page';
import { map, catchError } from 'rxjs/operators';
import { Customer } from './data/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = "http://localhost:8080/v1/customers"

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

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer)
      .pipe(
        map(obj => obj), 
        catchError((e) =>
          this.handleError(e)
        )
      )
  }

  read(): Observable<CustomerPage> {
    return this.http.get<CustomerPage>(this.baseUrl)
  }

  readById(id: string): Observable<Customer> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Customer>(url)
      .pipe(
        map(obj => obj), 
        catchError((e) => 
          this.handleError(e)
        )
      )
  }

  update(Customer: Customer): Observable<Customer> {
    const url = `${this.baseUrl}/${Customer.id}`
    return this.http.put<Customer>(url, Customer)
      .pipe(
        map(obj => obj), 
        catchError((e) => 
          this.handleError(e)
        )
      )
  }

  delete(id: string): Observable<Customer> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Customer>(url)
      .pipe(
        map(obj => obj), 
        catchError((e) => 
          this.handleError(e)
        )
      )
  }
}
