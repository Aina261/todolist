import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTodoComponent } from './todo/modules/edit-todo/edit-todo.component';

const routes: Routes = [
    {path: 'edit/:id', component: EditTodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
