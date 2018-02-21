import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-recent-comment',
  templateUrl: './recent-comment.component.html',
  styleUrls: ['./recent-comment.component.css']
})
export class RecentCommentComponent implements OnInit {

  @Input() comments: Array<Comment>;

  constructor() { }

  ngOnInit() {
  
  }

}
