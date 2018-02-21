import { Component, OnInit, Input } from '@angular/core';
import { Comment } from "../../models/comment";
import { User } from "../../models/user";
import { UserService } from "../../services/user-service/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  user: User = new User();


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserById(this.comment.userId).then((data) => {
      this.user = data;
    }).catch((err)=>{
     this.router.navigateByUrl("");
    })
  }


}
