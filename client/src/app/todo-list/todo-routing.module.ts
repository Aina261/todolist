import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TodoListComponent} from "./todo-list.component";
import {TodoEditComponent} from "./todo-edit/todo-edit.component";

const todoRoutes: Routes = [
    {path: 'todo', component: TodoListComponent},
    {path: 'todo/edit/:id', component: TodoEditComponent}
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(todoRoutes),
        CommonModule
    ],
    exports: [RouterModule]
})
export class TodoRoutingModule {
}
