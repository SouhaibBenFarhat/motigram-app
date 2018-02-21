import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { PostService } from '../../services/post-service/post.service';
import { Post } from '../../models/post';
import { CommentService } from '../../services/comment-service/comment.service';
import { Comment } from '../../models/comment';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user: User = new User();
  private posts: Array<Post> = new Array<Post>();
  private comments: Array<Comment> = new Array<Comment>();
  private recentComments: Array<Comment> = new Array<Comment>();



  constructor(private router: Router, private userService: UserService, private authService: AuthService, private postService: PostService, private commentService: CommentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let userId = params.id;

      this.userService.getUserById(userId).then((data) => {
        this.user = data;
        this.getUserPosts();
        this.getUserComments();
      }).catch((err) => {
        this.router.navigateByUrl("");
      })

    });
  }



  getUserPosts() {
    this.postService.getPostByUser(this.user.username).then((data) => {
      this.posts = data;
    })
  }

  getUserComments() {
    this.commentService.getLatestCommentsByUserId(this.user.id).then((data) => {
      this.comments = data;
      for (let i = 0; i < this.comments.length; i++) {
        this.recentComments.push(this.comments[i]);
      }
      this.recentComments.length = Math.min(this.comments.length, 5);

    })
  }

}
