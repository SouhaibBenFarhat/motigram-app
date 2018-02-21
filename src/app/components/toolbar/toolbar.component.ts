import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Globals } from '../../utility/global';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UploadService } from '../../services/upload-service/upload.service';
import { PostService } from '../../services/post-service/post.service';
import { Post } from '../../models/post';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {


  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  private currentUser: User = new User();
  private defaultImagePlaceholder = new Globals().DEFAUL_IMAGE_PLACEHOLDER;
  private imageSource: string = this.defaultImagePlaceholder;
  private file: File;
  private loading: boolean = false;
  private error: boolean = false;
  private errorText: string = "";
  private post: Post = new Post();


  constructor(private postService: PostService, private authService: AuthService, private uploadService: UploadService, private router: Router, private toastr: ToastsManager, private activatedRoute: ActivatedRoute, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.post.description = "";
  }

  ngOnInit() {


    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (!(event.url.indexOf("authentication") >= 0)) {
          this.authService.getCurrentUser().then((data) => {
            this.currentUser = data;
          })
        }

      }
    });
  }



  openUploader() {
    this.inputFile.nativeElement.click();
  }

  fileChange(event) {
    this.file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (e: any) => {
      this.imageSource = "";
      this.imageSource = e.target.result;
    }
  }

  sendNewPost() {
    if (this.file == null || this.file == undefined) {
      this.toastr.warning('Please select an image', 'Oups');
      return;
    }
    this.loading = true;
    this.uploadService.uploadPostThumbnail(this.file).then((data: any) => {
      let newPost = {
        thumbnail: data.body.path,
        description: this.post.description,
        userId: this.currentUser.id
      }
      this.postService.addNewPost(newPost).then((data) => {
        this.closeBtn.nativeElement.click();
        this.loading = false;
        this.toastr.success('successfully shared...', 'Success')
        console.log('1');


      }).catch((err) => {
        this.loading = false;
        this.toastr.warning('Connection refused...', 'Oups!');
        console.log(err);

      })

    }).catch((err) => {
      this.loading = false;
      this.toastr.warning('Error while uploading...', 'Oups!');

    });



  }

  logout() {
    this.authService.logout().then(() =>
      this.authService.backToLogin());
  }

}
