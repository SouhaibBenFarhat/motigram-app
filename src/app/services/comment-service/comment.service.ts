import { Injectable } from '@angular/core';
import { Comment } from "../../models/comment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utility/global';
import { Converters } from '../../utility/converters';
import 'rxjs/add/operator/map';


@Injectable()
export class CommentService {

  headers;
  private converter: Converters;
  private global: Globals;

  constructor(private http: HttpClient) {
    this.converter = new Converters();
    this.global = new Globals();
  }

  getCommentsByPostId(postId): any {
    let comments = Array<Comment>();
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.global.DUMMY_TOKEN });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['comment'] + '/' + postId, { headers: this.headers }).map((data: any) => data.data).subscribe((data) => {
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
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.global.DUMMY_TOKEN });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['latest-comment'] + '/' + postId, { headers: this.headers }).map((data: any) => data.data).subscribe((data) => {
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

}
