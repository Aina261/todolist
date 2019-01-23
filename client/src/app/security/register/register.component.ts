import {Component, OnInit} from '@angular/core';
import {SecurityService} from "../../service/security.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerModel: any = {};

    infoRegisterSuccess = false;
    infoRegisterError = false;

    constructor(private securityService: SecurityService) {}

    ngOnInit() {}

    register() {
        this.infoRegisterSuccess = false;
        this.infoRegisterError = false;

        this.securityService.register(this.registerModel)
            .subscribe(res => {
                console.log(res);
                /*if (res.userCreate) {
                    this.infoRegisterSuccess = true;
                    document.getElementById('registerForm').reset();
                } else {
                    this.infoRegisterError = true;
                }*/
            });
    }
}
