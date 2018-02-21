import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utility/global';
import { Router } from '@angular/router';
import { Converters } from '../../utility/converters';

@Injectable()
export class AuthService {

  public currentUser: User;
  private converter: Converters;
  private global: Globals;

  constructor(private http: HttpClient, private router: Router) {
    this.global = new Globals();
    this.converter = new Converters();
  }

  login(user: User): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.global.urls['login'], { username: user.username, password: user.password }).map((data: any) => data.data).subscribe((data) => {
        if (data != null) {
          this.currentUser = this.converter.userConverter(data);
          this.persistToken(data.token);
          localStorage.setItem(this.global.IS_LOGGED_IN, 'true');
          resolve(this.currentUser);
        } else {
          reject('This user is not defined');
        }
      }, (err) => {
        reject(err);
        console.log(err);
      });

    });
  }

  register(user: User): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.global.urls['register'], { username: user.username, password: user.password }).map((data: any) => data.data).subscribe((data) => {
        if (data != null) {
          this.currentUser = this.converter.userConverter(data);
          resolve(this.currentUser);
        } else {
          reject('This user is not defined');
        }
      }, (err) => {
        reject(err);
        console.log(err);
      });

    });
  }


  getCurrentUser(): any {
    return new Promise((resolve, reject) => {
      if (this.currentUser !== null && this.currentUser !== undefined && localStorage.getItem(this.global.IS_LOGGED_IN) == 'true') {
        resolve(this.currentUser);
      } else {
        if (this.getCurrentUserToken() != null && this.getCurrentUserToken() != undefined && localStorage.getItem(this.global.IS_LOGGED_IN) == 'true') {
          this.getUserByToken(this.getCurrentUserToken()).then((data: User) => {
            if (data != null && data != undefined) {
              this.currentUser = data;
              this.persistToken(data.token);
              resolve(data);

            } else {
              this.router.navigate(['/authentication']);
            }
          }).catch((err) => {
            reject('This user is not defined.');
            this.router.navigate(['/authentication']);
          });
        } else {
          if (window.location.href.indexOf('email-verification') >= 0) {
            return;
          } else {
            this.router.navigate(['/authentication']);
          }
        }
      }

    });

  }

  private getUserByToken(token: string): any {
    const headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + token });

    return new Promise((resolve, reject) => {
      this.http.get(this.global.urls['info'], { headers: headers }).map((data: any) => data.data).subscribe((data) => {
        if (data != null) {
          this.currentUser = this.converter.userConverter(data);
          this.persistToken(this.currentUser.token);
          resolve(this.currentUser);

        } else {
          reject('This user is not defined');
        }
      }, (err) => {
        reject(err);
      });
    });

  }




  public getCurrentUserToken(): any {
    if (localStorage.getItem(this.global.TOKEN_KEY) != null && localStorage.getItem(this.global.TOKEN_KEY) != undefined && localStorage.getItem(this.global.TOKEN_KEY).length > 10) {
      return localStorage.getItem(this.global.TOKEN_KEY);
    } else {
      localStorage.removeItem(this.global.TOKEN_KEY);
      localStorage.setItem(this.global.IS_LOGGED_IN, 'false');
      window.location.href = "http://localhost:4200/authentication"
    }
  }

  private persistToken(token: string) {
    localStorage.setItem(this.global.TOKEN_KEY, token);

  }

  logout() {
    return new Promise((resolve, reject) => {
      this.currentUser = null;
      localStorage.setItem(this.global.IS_LOGGED_IN, 'false');
      localStorage.removeItem(this.global.TOKEN_KEY);
      resolve();
    });
  }

  backToLogin() {
    this.currentUser = null;
    localStorage.setItem(this.global.IS_LOGGED_IN, 'false');
    localStorage.removeItem(this.global.TOKEN_KEY);
    this.router.navigateByUrl('authentication');
  }

}
