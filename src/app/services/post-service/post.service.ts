import { Injectable } from '@angular/core';
import { Post } from "../../models/post";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../../utility/global';
import { Converters } from '../../utility/converters';
import { User } from "../../models/user";
import { AuthService } from "../auth-service/auth.service";

import 'rxjs/add/operator/map';
import { EventBus } from '../../EventEmitter/event.bus';



@Injectable()
export class PostService {


  headers;
  private converter: Converters;
  private global: Globals;

  constructor(private http: HttpClient, private authService: AuthService, private eventBus: EventBus) {
    this.converter = new Converters();
    this.global = new Globals();
  }

  getAllPosts(): any {
    let posts = Array<Post>();
    let headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['post'], { headers: headers }).map((data: any) => data.data).subscribe((data) => {
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
  getMostPopularPosts(): any {
    let posts = Array<Post>();
    let headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['popular-post'], { headers: headers }).map((data: any) => data.data).subscribe((data) => {
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
    let headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['latest-posts'], { headers: headers }).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          let post = this.converter.postConverter(data[i])
          posts.push(post);
        }
        resolve(posts);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

  getPostByUser(username: string): any {
    let posts = Array<Post>();
    let headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['post-by-username'] + username, { headers: headers }).map((data: any) => data.data).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          let post = this.converter.postConverter(data[i])
          posts.push(post);
        }
        resolve(posts);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

  addNewPost(post: any): any {

    let headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {

      this.http.post(this.global.urls['post'], post, { headers: headers }).map((data: any) => data.data).subscribe((data) => {
        let post = this.converter.postConverter(data);
        this.eventBus.onNewPostTriggerEvent(post);
        resolve(post);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

  getWhoCommentedByPostId(postId): any {
    let users = Array<User>();
    let headers = new HttpHeaders(
      { 'authorization': 'Bearer ' + this.authService.getCurrentUserToken() });
    return new Promise((resolve, reject) => {

      this.http.get(this.global.urls['post-user-comments'] + postId, { headers: headers }).map((data: any) => data.data).subscribe((data) => {

        for (let i = 0; i < data.length; i++) {
          let user = this.converter.userConverter(data[i])
          users.push(user);
        }
        resolve(users);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }


}
