import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TodoInterface} from "../inteface/todo-interface";
import {TodoService} from "../service/todo.service";
import {UserInterface} from "../inteface/user-interface";
import {UserService} from "../service/user.service";

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {


    actualDate = new Date();
    reminderDueDate = new Date(this.actualDate.getTime() + (1000 * 60 * 60 * 24));
    todos = null;
    todo: TodoInterface = null;
    errorInput = false;

    users: UserInterface[] = null;

    bold = {
        'font-weight': 'bold'
    };

    newTodo: any = {
        name: '',
        due_date: null,
        userId: null
    };

    constructor(private router: Router, private todoService: TodoService, private userService: UserService) {
    }

    ngOnInit() {
        this.getUsers();
        this.getTodos();
    }

    getTodos(): void {
        this.todoService.getTodos().subscribe(todos => this.todos = todos);
    }

    getUsers(): void {
        this.userService.getUsers().subscribe(users => this.users = users);
    }

    addNewTodo() {
        if (this.newTodo.name.length >= 1 && this.newTodo.due_date !== null && this.newTodo.userId !== null && this.newTodo.userId !== "" ) {
            this.errorInput = false;

            this.userService.addTodoToUser(this.newTodo.userId, {todo: [this.newTodo]})
                .subscribe(
                    () => {
                        this.todoService.getTodos().subscribe(todos => this.todos = todos);
                        const addNewTodoForm = document.getElementById('addNewTodo') as HTMLFormElement;
                        addNewTodoForm.reset();
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
        if (this.todos[i].todoContent.completed) {
            this.todos[i].todoContent.completed = false;
        } else {
            this.todos[i].todoContent.completed = true;
        }

        this.todoService.updateTodo(this.todos[i].todoContent, this.todos[i].todoContent._id).subscribe()
    }

    deleteTodo(idItem: string): void {
        if (this.todoService.deleteTodoItem(idItem).subscribe(todo => this.todo = todo)) {
            const elt = document.getElementById(idItem);
            elt.parentNode.removeChild(elt);
        }
    }

}
