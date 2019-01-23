import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from "../../service/security.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginModel: any = {};

    infoLoginError = false;

    constructor(
        private router: Router,
        private securityService: SecurityService,
    ) {}

    ngOnInit() {
    }

    login() {
        this.infoLoginError = false;

        this.securityService.login(this.loginModel).subscribe(res => {
            if (res.userLogin) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('userName', res.user.userName);
                localStorage.setItem('userEmail', res.user.email);
                localStorage.setItem('userId', res.user._id);
                this.router.navigate(['/todo']);
            } else {
                this.infoLoginError = true;
            }
        });
    }
}
