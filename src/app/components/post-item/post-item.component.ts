import { Component, OnInit, Input } from '@angular/core';
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import { CommentService } from "../../services/comment-service/comment.service";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  @Input() post: Post;
  comments = new Array<Comment>();

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.commentService.getCommentsByPostId(this.post.id).then((data) => {
      this.comments = data;
      console.log(this.comments);
    })
  }

}
