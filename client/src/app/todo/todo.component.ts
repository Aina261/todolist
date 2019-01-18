import {Component, OnInit} from '@angular/core';
import {TodoInterface} from './interface/todo-interface';
import {TodoService} from "./service/todo.service";

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

    openActionItem: boolean = false;
    todos: TodoInterface[] = null;

    constructor(private todoService: TodoService) {
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

    getTodos(): void {
        this.todoService.getTodos().subscribe(todos => this.todos = todos);
    }

}
