import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TodoListComponent} from "./todo-list.component";
import {TodoEditComponent} from "./todo-edit/todo-edit.component";
import {AuthGuardService, AuthGuardService as AuthGuard} from '../auth/auth-guard.service';


const todoRoutes: Routes = [
    {path: 'todo', component: TodoListComponent, canActivate: [AuthGuard]},
    {path: 'todo/edit/:id', component: TodoEditComponent, canActivate: [AuthGuard]}
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(todoRoutes),
        CommonModule
    ],
    providers: [AuthGuardService, AuthGuard],
    exports: [RouterModule]
})
export class TodoRoutingModule {
}
