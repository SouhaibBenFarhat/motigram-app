import { Injectable } from '@angular/core';
import { Comment } from "../../models/comment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utility/global';
import { Converters } from '../../utility/converters';
import { AuthService } from "../auth-service/auth.service";
import 'rxjs/add/operator/map';


@Injectable()
export class CommentService {

  headers;
  private converter: Converters;
  private global: Globals;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.converter = new Converters();
    this.global = new Globals();
  }

  getCommentsByPostId(postId): any {
    let comments = Array<Comment>();
    let headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['comment'] + '/' + postId, { headers: headers }).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          let comment = this.converter.commentConverter(data[i])
          comments.push(comment);
        }
        resolve(comments);
      }, (err) => {
        reject(err);
      });
    });
  }

  getLatestCommentsByPostId(postId): any {
    let comments = Array<Comment>();
    let headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['latest-comment'] + '/' + postId, { headers: headers }).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          let comment = this.converter.commentConverter(data[i])
          comments.push(comment);
        }
        resolve(comments);
      }, (err) => {
        reject(err);
      });
    });
  }
  getLatestCommentsByUserId(userId: string): any {
    let comments = Array<Comment>();
    let headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['comment-by-user'] + userId, { headers: headers }).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          let comment = this.converter.commentConverter(data[i])
          comments.push(comment);
        }
        resolve(comments);
      }, (err) => {
        reject(err);
      });
    });
  }

  addNewComment(comment: Comment) {

    let headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });

    return new Promise((resolve, reject) => {
      this.http.post(this.global.urls['comment'], comment, { headers: headers }).map((data: any) => data.data).subscribe((data) => {
        if (data != null) {
          let comment = this.converter.commentConverter(data);
          console.log(comment);
          resolve(comment);
        } else {
          reject('Oups!, Error occure...');
        }
      }, (err) => {
        reject(err);
        console.log(err);
      });

    });

  }

}
