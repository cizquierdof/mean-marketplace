import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Users } from '../models/users';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getUsers = () => {
    return this.httpClient.get<Users[]>('http://localhost:4000/api/user');
  }

  // tslint:disable-next-line: variable-name
  getUser = (_id: string): Observable<Users> => {
    return this.httpClient.get<Users>(`http://localhost:4000/api/user/` + _id);
  }

  // tslint:disable-next-line: variable-name
  saveUsers = (users: Users): Observable<Users> => {
    console.log('saving patient', Users);
    return this.httpClient
      .post<Users>('http://localhost:4000/api/user/', users, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // tslint:disable-next-line: variable-name
  putUsers = (users: Users, _id: string): Observable<Users> => {
    return this.httpClient
      .put<Users>(
        'http://localhost:4000/api/user/' + _id,
        users,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  searchUsers = (search: string) => {
    return this.httpClient
      .get<Users[]>(
        'http://localhost:4000/api/user/search/' + search,
        this.httpOptions
      )
      .toPromise();
  }

  upload = (files: FileList, userId: string ) => {
    console.log('ficheros', files);
    const form = new FormData();
    for (let index = 0; index < files.length; index++) {
      form.append(`file-${index}`, files.item(index), files.item(index).name);
    }

    return this.httpClient.post<any>(
      'http://localhost:4000/api/user/upload-image/' + userId, form
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
console.log('me traigo', Users);
