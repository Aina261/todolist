import {Component, OnInit} from '@angular/core';
import {TodoInterface} from './interface/todo-interface';
import {TodoService} from "./service/todo.service";
import { Router} from '@angular/router';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

    openActionItem: boolean = false;
    checked: boolean = false;
    todos: TodoInterface[] = null;
    todo: TodoInterface= null;

    constructor( private router: Router, private todoService: TodoService) {
    }

    ngOnInit() {
        this.getTodos();
    }

    onToggleActionItem() {
        if (this.openActionItem) {
            this.openActionItem = false;
        } else {
            this.openActionItem = true;
        }
    }

    onCheckedTodo() {
        if (this.checked) {
            this.checked = false;
        } else {
            this.checked = true;
        }
    }

    getTodos(): void {
        this.todoService.getTodos().subscribe(todos => this.todos = todos);
    }

    deleteTodo(idItem: string): void {
        if (this.todoService.deleteTodoItem(idItem).subscribe(todo => this.todo = todo)) {
            const elt = document.getElementById(idItem);
            elt.parentNode.removeChild(elt);
            this.openActionItem = false;
        }
    }

    editTodo(todo: TodoInterface) {
        this.router.navigate(['/edit', todo._id]);
    }
}
