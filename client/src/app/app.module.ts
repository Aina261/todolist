import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodoComponent} from './todo/todo.component';
import {AddTodoComponent} from './todo/modules/add-todo/add-todo.component';
import {AddTodoFormComponent} from './todo/modules/add-todo-form/add-todo-form.component';
import { EditTodoComponent } from './todo/modules/edit-todo/edit-todo.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoComponent,
        AddTodoComponent,
        AddTodoFormComponent,
        EditTodoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
