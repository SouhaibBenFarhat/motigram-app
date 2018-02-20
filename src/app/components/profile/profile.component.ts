import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { PostService } from '../../services/post-service/post.service';
import { Post } from '../../models/post';
import { CommentService } from '../../services/comment-service/comment.service';
import { Comment } from '../../models/comment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private currentUser: User = new User();
  private posts: Array<Post> = new Array<Post>();
  private comments: Array<Comment> = new Array<Comment>();

  constructor(private authService: AuthService, private postService: PostService, private commentService: CommentService) { }

  ngOnInit() {
    this.authService.getCurrentUser().then((data) => {
      this.currentUser = data;
      this.getUserPosts();
      this.getUserComments();
    })
  }



  getUserPosts() {
    this.postService.getPostByUser(this.currentUser.username).then((data) => {
      this.posts = data;
    })
  }

  getUserComments() {
    this.commentService.getLatestCommentsByUserId(this.currentUser.id).then((data) => {
      this.comments = data;
      console.log(this.comments);
    })
  }

}
