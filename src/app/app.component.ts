import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  hideExtra: boolean = false;


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if ((event.url.indexOf("authentication") >= 0)) { this.hideExtra = true; }
        else { this.hideExtra = false }
      }
    });
  }
}
