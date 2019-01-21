import { Injectable } from '@angular/core';
import {TodoInterface} from "../inteface/todo-interface";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

    private apiUrl = 'http://localhost:3050/todo';

    private log(message: string) {
        console.log(message);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    constructor(private http: HttpClient) {}

    getTodos(): Observable<TodoInterface[]> {
        return this.http.get<TodoInterface[]>(this.apiUrl, {responseType: 'json'})
            .pipe(
                tap(() => this.log('Fetched Todos')),
                catchError(this.handleError<TodoInterface[]>('getTodos', []))
            )
    }

    getTodo(todoId): Observable<TodoInterface> {
        return this.http.get<TodoInterface>(`${this.apiUrl}/${todoId}`)
            .pipe(
                tap( () => this.log('fetched todo')),
                catchError(this.handleError<TodoInterface>('No todo found'))
            )
    }

    deleteTodoItem(idItem: string): Observable<TodoInterface> {
        return this.http.delete<TodoInterface>(`${this.apiUrl}/${idItem}`)
            .pipe(
                tap(() => this.log('delete todo ' + idItem)),
                catchError(this.handleError<TodoInterface>('Error: '))
            )
    }

    addNewTodo(newTodo) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.post<TodoInterface>(this.apiUrl, newTodo, httpOptions)
            .pipe(
                tap (() => this.log('New task added')),
                catchError(this.handleError<TodoInterface>(('Error addNewTask')))
            )
    }

    updateTodo(todo, id) {
        return this.http.put<TodoInterface>(`${this.apiUrl}/${id}`, todo)
            .pipe(
                tap (() => this.log('Update task')),
                catchError(this.handleError<TodoInterface>(('Error updateTodo')))
            )
    }
}
