import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../../services/auth-service/auth.service";
import { User } from '../../../models/user';
import { Globals } from '../../../utility/global';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  error: boolean = false;
  errorText: string = "";
  loading: boolean = false;
  formIsValid: boolean = true;
  global = new Globals();

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    localStorage.setItem(this.global.IS_LOGGED_IN, 'false');
    localStorage.removeItem(this.global.TOKEN_KEY);
  }

  onLoginSubmitted({ value, valid }: { value: User, valid: boolean }) {
    console.log(valid);
    if (valid) {
      this.loading = true;
      this.formIsValid = valid;
      this.authService.login(this.user).then((data) => {
        this.router.navigate(['']);
      }).catch((err) => {
        this.handleErrors(err);
      });
    } else {
      this.formIsValid = false;
      this.errorText = "Oups, Please make sure to set a valid data..."
    }
  }

  handleErrors(error) {

    if (error.status == 404) {
      this.loading = false;
      this.formIsValid = false;
      this.errorText = error.error.message;
    } else {
      this.loading = false;
      this.formIsValid = false;
      this.errorText = "Connection refused";
    }
  }

}
