import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Supplier } from '../models/supplier';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  public url: string;
  public identity: any;
  public token: string;

  constructor(private httpClient: HttpClient) {
  }

  getToken = () => {
    const token = localStorage.getItem('token');
    if (token !== 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getSuppliers = () => {
    return this.httpClient.get<Supplier[]>('http://localhost:4000/api/supplier/');
  }


  getSupplier = (id: string) => {
    return this.httpClient.get<Supplier>('http://localhost:4000/api/supplier/' + id);
  }


  saveSupplier = (supplier: Supplier, id: string = null): Observable<Supplier> => {
    if (id) {
      return this.httpClient.put<Supplier>(// Actualizar
        'http://localhost:4000/api/supplier/' + id, supplier, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    } else {
      return this.httpClient.post<Supplier>(// Crear
        'http://localhost:4000/api/supplier/', supplier, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
  }

  deleteSupplier = (id: string): Observable<Supplier> => {
    return this.httpClient.delete<Supplier>(
      `http://localhost:4000/api/supplier/${id}`
    );
  }
  searchSupplier = (search: string) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getToken(),
    });
    return this.httpClient
      .get<Supplier[]>('http://localhost:4000/api/supplier/search/' + search, {
        headers: headers,
      })
      .toPromise();
  };


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


}
