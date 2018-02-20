import { Injectable } from '@angular/core';
import { Post } from "../../models/post";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utility/global';
import { Converters } from '../../utility/converters';
import 'rxjs/add/operator/map';



@Injectable()
export class PostService {


  headers;
  private converter: Converters;
  private global: Globals;

  constructor(private http: HttpClient) {
    this.converter = new Converters();
    this.global = new Globals();
  }

  getAllPosts(): any {
    let posts = Array<Post>();
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.global.DUMMY_TOKEN });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['post'], { headers: this.headers }).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          let post = this.converter.postConverter(data[i])
          posts.push(post);
        }
        resolve(posts);
      }, (err) => {
        reject(err);
      });
    });
  }

  getLatestPosts(): any {
    let posts = Array<Post>();
    this.headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.global.DUMMY_TOKEN });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['latest-posts'], { headers: this.headers }).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          let post = this.converter.postConverter(data[i])
          posts.push(post);
        }
        resolve(posts);
      }, (err) => {
        reject(err);
      });
    });
  }


}
