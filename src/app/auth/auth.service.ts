import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RequestService } from '../shared/services/request.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'auth';
  user = new BehaviorSubject<User>(null);
  constructor(private requestService: RequestService) {}

  login(email: string, password: string) {
    return this.requestService
      .sendPostRequest(this.endpoint + '/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData['email'],
            resData['userId'],
            resData['token'],
            resData['expirationTime']
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknow error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    console.log(errorRes);
    return throwError(errorMessage);
  }
}
