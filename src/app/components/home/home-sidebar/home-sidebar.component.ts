import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth-service/auth.service";
import { User } from "../../../models/user";

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent implements OnInit {

  private currentUser: User = new User();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().then((data) => {
      this.currentUser = data;
    })
  }

}
