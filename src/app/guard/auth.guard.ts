import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { Globals } from '../utility/global';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {

    global = new Globals();

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(): Observable<boolean> | boolean | any {

        return new Promise((resolve, reject) => {
            if (this.authService.currentUser != null && this.authService.currentUser != undefined &&
                localStorage.getItem(this.global.IS_LOGGED_IN) == 'true') {
                resolve(true);
            } else {
                if (localStorage.getItem(this.global.IS_LOGGED_IN) == 'true') {
                    this.authService.getCurrentUser().then((data) => {
                        if (data) {
                            resolve(true);
                        } else {
                            this.authService.logout().then(() => {
                                this.router.navigate(['/authentication']);
                                resolve(false);
                            });
                        }
                    }).catch((err) => {
                        this.authService.logout().then(() => {
                            this.router.navigate(['/authentication']);
                            resolve(false);
                        });
                    });
                } else {
                    this.authService.logout().then(() => {
                        this.router.navigate(['/authentication']);
                        resolve(false);
                    });
                }
            }
        });

    }

}

