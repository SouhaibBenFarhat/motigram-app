import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth-service/auth.service";
import { User } from "../../../models/user";
import { PostService } from '../../../services/post-service/post.service';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent implements OnInit {

  private currentUser: User = new User();
  private popularPosts: Array<Post> = new Array<Post>();

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit() {
    this.postService.getMostPopularPosts().then((data) => {
      this.popularPosts = data
    });


    this.authService.getCurrentUser().then((data) => {
      this.currentUser = data;
    })
  }

}
