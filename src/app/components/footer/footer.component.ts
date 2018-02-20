import { Component, OnInit } from '@angular/core';
import { Post } from "../../models/post";
import { PostService } from "../../services/post-service/post.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private posts = new Array<Post>();

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getLatestPosts().then((data) => {
      this.posts = data;
    })
  }

}
