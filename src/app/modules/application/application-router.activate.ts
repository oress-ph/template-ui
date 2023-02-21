import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

@Injectable()
export class ApplicationRouterActivate implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate() {
        if (localStorage.getItem("token") == null) {
            this.router.navigate(["/security/login"]);
            return false;
        } else {
            if (localStorage.getItem("user_type") === 'Admin')
                return true;
            else if (localStorage.getItem("user_type") === 'User')
                return true;
            else {
                this.router.navigate(["/security/login"]);
                return false;
            }
        }
    }
}