import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component'
import { HomeComponent } from './components/home/home.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

//My custom imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { ToastCustomOptions } from "./utility/ToastCustomOptions";

//Guards
import { AuthGuard } from './guard/auth.guard';


//Services
import { AuthService } from "./services/auth-service/auth.service";
import { PostService } from "./services/post-service/post.service";
import { CommentService } from "./services/comment-service/comment.service";
import { UserService } from "./services/user-service/user.service";
import { EventBus } from "./EventEmitter/event.bus";
import { UploadService } from "./services/upload-service/upload.service";




//Components
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { HomeSidebarComponent } from './components/home/home-sidebar/home-sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostSmallItemComponent } from './components/post-small-item/post-small-item.component';
import { CommentComponent } from './components/comment/comment.component';
import { TimelineItemComponent } from './components/timeline-item/timeline-item.component';
import { RecentCommentComponent } from './components/recent-comment/recent-comment.component';
import { RecentCommentItemComponent } from './components/recent-comment/recent-comment-item/recent-comment-item.component';


//Routes Configuration
const appRoutes: Routes = [
  { path: 'authentication', component: AuthenticationComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'add-post', component: AddPostComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PostItemComponent,
    ProfileComponent,
    AddPostComponent,
    ToolbarComponent,
    AuthenticationComponent,
    RegisterComponent,
    LandingComponent,
    SidemenuComponent,
    HomeSidebarComponent,
    FooterComponent,
    PostSmallItemComponent,
    CommentComponent,
    TimelineItemComponent,
    RecentCommentComponent,
    RecentCommentItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [AuthService,
    PostService,
    CommentService,
    UserService,
    AuthGuard,
    { provide: ToastOptions, useClass: ToastCustomOptions },
    EventBus,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
