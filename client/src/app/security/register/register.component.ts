import {Component, OnInit} from '@angular/core';
import {SecurityService} from "../../service/security.service";
import {UserInterface} from "../../inteface/user-interface";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerModel: UserInterface = {
        _id: null,
        userName: '',
        email: '',
        password: '',
        createdDate: null,
        todo: null,
    };

    infoRegisterSuccess = false;
    invalidRegisterForm = false;
    infoRegisterError = false;

    constructor(private securityService: SecurityService) {}

    ngOnInit() {}

    register() {

        this.infoRegisterSuccess = false;
        this.invalidRegisterForm = false;
        this.infoRegisterError = false;

        if ( this.registerModel.userName != null && this.registerModel.email != null && this.registerModel.password != null ) {
            if ( this.registerModel.userName.length > 1 && this.registerModel.email.length > 1 && this.registerModel.password.length > 1 ) {


                this.infoRegisterSuccess = false;
                this.invalidRegisterForm = false;
                this.infoRegisterError = false;

                this.securityService.register(this.registerModel)
                    .subscribe(data => {
                        if (data.userCreate) {
                            this.infoRegisterSuccess = true;
                            const form = document.getElementById('registerForm') as HTMLFormElement;
                            form.reset();
                        } else {
                            this.infoRegisterError = true;
                        }
                    });

            } else {
                this.invalidRegisterForm = true;
            }
        } else {
            this.invalidRegisterForm = true;
        }




    }
}
