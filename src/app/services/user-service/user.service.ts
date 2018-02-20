import { Injectable } from '@angular/core';
import { User } from "../../models/user";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utility/global';
import { Converters } from '../../utility/converters';
import { AuthService } from "../../services/auth-service/auth.service";
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  headers;
  private converter: Converters;
  private global: Globals;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.converter = new Converters();
    this.global = new Globals();
  }

  getUserById(userId): any {
    let user: User;
    let headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['user-by-id'] + userId, { headers: headers }).map((data: any) => data.data).subscribe((data) => {
        let user = this.converter.userConverter(data);
        resolve(user);
      }, (err) => {
        reject(err);
      });
    });
  }

  
}
