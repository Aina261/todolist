import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {TodoModule} from "./todo-list/todo.module";
import {LoginComponent} from './security/login/login.component';
import {RegisterComponent} from './security/register/register.component';
import {SecurityComponent} from './security/security.component';

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
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
