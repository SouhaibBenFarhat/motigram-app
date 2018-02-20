import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'



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



//Services
import { AuthService } from "./services/auth-service/auth.service";
import { PostService } from "./services/post-service/post.service";
import { CommentService } from "./services/comment-service/comment.service";


//Components
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { HomeSidebarComponent } from './components/home/home-sidebar/home-sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostSmallItemComponent } from './components/post-small-item/post-small-item.component';
import { CommentComponent } from './components/comment/comment.component';


//Routes Configuration
const appRoutes: Routes = [
  { path: 'authentication', component: AuthenticationComponent },
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
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
    CommentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,

  ],
  providers: [AuthService, PostService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
