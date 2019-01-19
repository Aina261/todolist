import {Component, OnInit} from '@angular/core';
import {TodoInterface} from "../../interface/todo-interface";
import {TodoService} from "../../service/todo.service";

@Component({
    selector: 'app-add-todo-form',
    templateUrl: './add-todo-form.component.html',
    styleUrls: ['./add-todo-form.component.scss']
})

export class AddTodoFormComponent implements OnInit {

    localDateTime = new Date();
    date: Date = null;

    todos: TodoInterface[] = null;

    newTodo = {
        name: '',
        due_date: this.date,
    };

    constructor(private todoService: TodoService) {
    }

    ngOnInit() {
    }

    onSubmit() {

        /**
         * TODO
         * Add Element without reloading page
         */

        this.todoService.addNewTodo(this.newTodo).subscribe(
            () => {
                location.reload();
            },
        );
        console.log(this.newTodo);
    }

}
