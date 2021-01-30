import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RequestService } from '../shared/services/request.service';
import { Address } from './address.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = 'auth';
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private requestService: RequestService, private router: Router) {}

  signup({
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    street,
    number,
    postalCode,
    city,
    region,
    country,
  }) {
    const address = new Address(
      street,
      number,
      postalCode,
      city,
      region,
      country
    );
    return this.requestService
      .sendPostRequest(this.endpoint + '/signup', {
        email: email,
        password: password,
        address: JSON.stringify(address),
        firstName: firstName,
        lastName: lastName,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData['email'],
            resData['userId'],
            resData['address'],
            resData['token'],
            +resData['expirationTime'],
            resData['isAdmin']
          );
        })
      );
  }

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
            resData['address'],
            resData['token'],
            +resData['expirationTime'],
            resData['isAdmin']
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      address: Address;
      _token: string;
      _tokenExpirationDate: string;
      isAdmin: boolean;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.address,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.isAdmin
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    //clear token expiration timer
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  getUser() {
    const userData: {
      email: string;
      id: string;
      address: Address;
      _token: string;
      _tokenExpirationDate: string;
      isAdmin: boolean;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.address,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.isAdmin
    );

    if (loadedUser.token) {
      return loadedUser;
    }
    return null;
  }

  isAdmin() {
    const user = this.getUser();
    if (user) {
      return user.isAdmin;
    }
    return false;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    address: Address,
    token: string,
    expiresIn: number,
    isAdmin: boolean
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(
      email,
      userId,
      address,
      token,
      expirationDate,
      isAdmin
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage);
    }
    switch (errorRes.status) {
      case 401:
        errorMessage = 'Wrong credentials';
        break;
      default:
        break;
    }
    return throwError(errorMessage);
  }
}
