import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {TodoRoutingModule} from "./todo-routing.module";
import {TodoService} from "../service/todo.service";
import {TodoListComponent} from "./todo-list.component";
import {TodoEditComponent} from "./todo-edit/todo-edit.component";


@NgModule({
    declarations: [
        TodoListComponent, TodoEditComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        TodoRoutingModule
    ],
    providers: [
        TodoService
    ]
})
export class TodoModule {
}
