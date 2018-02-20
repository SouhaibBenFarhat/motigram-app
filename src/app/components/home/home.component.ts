import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post-service/post.service";
import { Post } from "../../models/post";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private posts = new Array<Post>();

  constructor( private postService: PostService) { }

  ngOnInit() {
    this.postService.getAllPosts().then((data) => {
      this.posts = data;
      console.log(this.posts);
    })

  
  }

}
