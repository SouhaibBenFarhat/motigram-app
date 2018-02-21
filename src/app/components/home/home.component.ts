import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post-service/post.service";
import { Post } from "../../models/post";
import { EventBus } from '../../EventEmitter/event.bus';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private posts = new Array<Post>();

  constructor(private postService: PostService, private eventBus: EventBus) { }

  ngOnInit() {
    this.eventBus.suscribeToNewPostsevent().subscribe((post: Post) => {
      this.posts.unshift(post);
    })

    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().then((data) => {
      this.posts = data;
      console.log(this.posts);
    })
  }

}
