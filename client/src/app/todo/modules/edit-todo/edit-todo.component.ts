import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {TodoInterface} from "../../interface/todo-interface";
import {TodoService} from "../../service/todo.service";

@Component({
    selector: 'app-edit-todo',
    templateUrl: './edit-todo.component.html',
    styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

    todo: TodoInterface = null;

    constructor( private route: ActivatedRoute, private todoService: TodoService) {
    }

    ngOnInit() {
        this.todoService.getTodo(this.route.snapshot.params['id']).subscribe( todo => {
            this.todo = todo;
        })
    }

}
