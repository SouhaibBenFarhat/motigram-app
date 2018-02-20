import { Component, OnInit } from '@angular/core';
import { Post } from "../../models/post";
import { PostService } from "../../services/post-service/post.service";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private posts = new Array<Post>();

  constructor(private postService: PostService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {


    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (!(event.url.indexOf("authentication") >= 0)) {
          this.postService.getLatestPosts().then((data) => {
            this.posts = data;
          })
        }

      }
    });
  }

}
