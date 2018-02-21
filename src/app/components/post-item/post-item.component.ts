import { Component, OnInit, Input, AfterViewInit, Renderer, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Post } from "../../models/post";
import { User } from "../../models/user";
import { Comment } from "../../models/comment";
import { CommentService } from "../../services/comment-service/comment.service";
import { AuthService } from '../../services/auth-service/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PostService } from '../../services/post-service/post.service';



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
  canLike: boolean = true;
  canDislike: boolean = true;

  constructor(private postService: PostService, private commentService: CommentService, private authService: AuthService, private toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {


    this.comment.content = "";
    this.loadComments();
    this.updateUI();

  }


  ngAfterViewInit() {
  }


  updateUI() {
    this.authService.getCurrentUser().then((data) => {
      this.currentUser = data;
      for (let i = 0; i < this.post.interactions.length; i++) {

        if (this.post.interactions[i].userId === this.currentUser.id && this.post.interactions[i].type === "like") {
          this.canLike = false;
        }
        if (this.post.interactions[i].userId === this.currentUser.id && this.post.interactions[i].type === "dislike") {
          this.canDislike = false;
        }

      }
    });
  }

  like() {
    if (this.currentUser == undefined || this.currentUser == null) {
      return;
    }

    this.postService.likePost(this.post.id, this.currentUser.id).then((data) => {
      this.post = data;
      this.updateUI();
    })
  }

  dislike() {
    if (this.currentUser == undefined || this.currentUser == null) {
      return;
    }

    this.postService.dislikePost(this.post.id, this.currentUser.id).then((data) => {
      this.post = data;
      this.updateUI();
    })
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
        this.comment = new Comment();
      }).catch((err) => {
        this.error = true;
        this.errorText = "Oups, error occure!";
      })
    } else {
      console.log('empty comment');
      this.error = true;
      this.errorText = "Empty comments are forbidden...";
    }
  }

  loadComments() {
    this.commentService.getCommentsByPostId(this.post.id).then((data) => {
      this.comments = data;
    });
  }


}
