import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'todo List';

    constructor(private router: Router) {
    }

    ngOnInit() {

    }

    ifLogged() {
        return localStorage.token;
    }

    disconnect() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        console.log('disconnect');
        this.router.navigateByUrl('/');
    }

    clickLogo() {
        this.router.navigateByUrl('/todo');
    }
}
