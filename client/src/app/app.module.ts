import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {TodoModule} from "./todo-list/todo.module";
import {LoginComponent} from './security/login/login.component';
import {RegisterComponent} from './security/register/register.component';
import {SecurityComponent} from './security/security.component';
import {AuthGuardService} from "./auth/auth-guard.service";
import {AuthService} from "./auth/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        SecurityComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        TodoModule,
    ],
    providers: [/*AuthGuardService, AuthService, JwtHelperService, InjectionToken*/],
    bootstrap: [AppComponent]
})
export class AppModule {
}
