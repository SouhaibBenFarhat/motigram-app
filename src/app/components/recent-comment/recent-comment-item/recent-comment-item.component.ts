import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../../models/comment';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post-service/post.service';

@Component({
  selector: 'app-recent-comment-item',
  templateUrl: './recent-comment-item.component.html',
  styleUrls: ['./recent-comment-item.component.css']
})
export class RecentCommentItemComponent implements OnInit {

  @Input() comment : Comment;
  private post : Post = new Post();

  constructor(private postService : PostService) { }

  ngOnInit() {

    this.postService.getPostById(this.comment.postId).then((data)=>{
      this.post = data;
    });

  }

}
