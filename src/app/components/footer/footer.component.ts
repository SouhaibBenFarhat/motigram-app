import { Component, OnInit } from '@angular/core';
import { Post } from "../../models/post";
import { PostService } from "../../services/post-service/post.service";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth-service/auth.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private posts = new Array<Post>();
  private currentUser: User = new User();

  constructor(private authService: AuthService, private postService: PostService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {




    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (!(event.url.indexOf("authentication") >= 0)) {
          this.postService.getLatestPosts().then((data) => {
            this.posts = data;
          })
          this.authService.getCurrentUser().then((data) => {
            this.currentUser = data;
          })
        }

      }
    });
  }

}
