import { Component, OnInit, Input, AfterViewInit, Renderer, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Post } from "../../models/post";
import { User } from "../../models/user";
import { Comment } from "../../models/comment";
import { CommentService } from "../../services/comment-service/comment.service";
import { AuthService } from '../../services/auth-service/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit, AfterViewInit {

  @Input() post: Post;
  @ViewChild('closeModal') closeModal: ElementRef;

  comments = new Array<Comment>();
  currentUser: User = new User();
  comment = new Comment();
  error: boolean = false;
  errorText: string = "";

  constructor(private commentService: CommentService, private authService: AuthService, private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {


    this.comment.content = "";
    this.loadComments();
    this.authService.getCurrentUser().then((data) => {
      this.currentUser = data;
    });




  }

  ngAfterViewInit() {
  }

  closeCommentModal() {
    this.closeModal.nativeElement.click()
  }

  sendComment() {
    if (this.comment.content.length != 0) {

      this.comment.postId = this.post.id;
      this.comment.userId = this.currentUser.id;
      this.commentService.addNewComment(this.comment).then((data) => {
        this.closeCommentModal();
        this.loadComments();
        this.toastr.success('Successfully added!', 'Success');
      }).catch((err) => {
        this.error = true;
        this.errorText = "Oups, error occure!";
      })
    } else {
      console.log('empty comment');
      this.error = true;
      this.errorText = "empty comment are forbidden...";
    }
  }

  loadComments() {
    this.commentService.getCommentsByPostId(this.post.id).then((data) => {
      this.comments = data;
    });
  }


}
