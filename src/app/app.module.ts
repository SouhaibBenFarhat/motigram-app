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
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './components/authentication/register/register.component';


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
    RegisterComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
