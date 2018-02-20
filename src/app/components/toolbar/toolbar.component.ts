import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/user';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  private currentUser: User = new User();

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

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

  logout() {
    this.authService.logout().then(() =>
      this.authService.backToLogin());
  }

}
