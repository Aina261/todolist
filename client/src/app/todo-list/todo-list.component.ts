import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TodoInterface} from "./inteface/todo-interface";
import {TodoService} from "./service/todo.service";


@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {


    todos: TodoInterface[] = null;
    todo: TodoInterface = null;
    errorInput = false;

    bold = {
        'font-weight': 'bold'
    };

    newTodo = {
        name: '',
        due_date: null,
    };

    constructor(private router: Router, private todoService: TodoService) {
    }

    ngOnInit() {
        this.getTodos();
    }

    getTodos(): void {
        this.todoService.getTodos().subscribe(todos => this.todos = todos);
    }

    addNewTodo() {
        if (this.newTodo.name.length > 3 && this.newTodo.due_date !== null) {
            this.errorInput = false;
            this.todoService.addNewTodo(this.newTodo)
                .subscribe(
                    () => {
                        this.todoService.getTodos().subscribe(todos => this.todos = todos);
                    }
                )
        } else {
            this.errorInput = true;
            setTimeout(() => {
                this.errorInput = false;
            }, 5000);
        }

    }

    goEdit(id) {
        this.router.navigate(['todo/edit', id]);
    }

    checkedTodo(i) {
        if (this.todos[i].completed) {
            this.todos[i].completed = false;
        } else {
            this.todos[i].completed = true;
        }

        this.todoService.updateTodo(this.todos[i], this.todos[i]._id).subscribe()
    }

    deleteTodo(idItem: string): void {
        if (this.todoService.deleteTodoItem(idItem).subscribe(todo => this.todo = todo)) {
            const elt = document.getElementById(idItem);
            elt.parentNode.removeChild(elt);
        }
    }

}
