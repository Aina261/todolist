import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoInterface} from "../../inteface/todo-interface";
import {TodoService} from "../../service/todo.service";

@Component({
    selector: 'app-todo-edit',
    templateUrl: './todo-edit.component.html',
    styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

    actualDate = new Date();
    todo: TodoInterface = undefined;

    constructor(private router: Router, private route: ActivatedRoute, private todoService: TodoService) {
    }

    ngOnInit() {
        this.todoService.getTodo(this.route.snapshot.params['id'])
            .subscribe( todo => {
                this.todo = todo;
            });
    }

    goBack() {
        this.router.navigateByUrl('/todo');
    }

    changeDueDate(event) {
        this.todo.due_date = event;
    }

    updateTodo() {
        this.todoService.updateTodo(this.todo, this.todo._id).subscribe( () => {
            this.router.navigateByUrl('/todo');
        })
    }

}
