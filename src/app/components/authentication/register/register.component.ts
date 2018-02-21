import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "../../../services/auth-service/auth.service";
import { User } from '../../../models/user';
import { Globals } from '../../../utility/global';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  onRegisterSubmitted({ value, valid }: { value: User, valid: boolean }) {
    console.log(valid);
    if (valid) {
      this.loading = true;
      this.formIsValid = valid;
      this.authService.register(this.user).then((data) => {
        this.authService.login(this.user).then((data) => {
          this.router.navigate(['']);
        }).catch((err) => {
          this.handleErrors(err);
        })
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
    } else if (error.status == 400) {
      this.loading = false;
      this.formIsValid = false;
      this.errorText = error.error.errors;
    }
    else {
      this.loading = false;
      this.formIsValid = false;
      this.errorText = "Connection refused";
    }
  }

}
