import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SecurityService} from "../../service/security.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    infoLoginError = false;

    loginModel: any = {};

    constructor(
        private router: Router,
        private securityService: SecurityService,
    ) {
    }

    ngOnInit() {
    }

    login() {
        this.infoLoginError = false;

        console.log(this.loginModel);
        this.securityService.login({
            "userName": this.loginModel.userName,
            "password": this.loginModel.password
        }).subscribe(res => {
            if (res.userLogin) {
                localStorage.setItem('userLogin', JSON.stringify({login: this.loginModel.username}));
                this.router.navigate(['/todo']);
            } else {
                this.infoLoginError = true;
            }
        });
    }
}
