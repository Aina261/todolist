import {Injectable} from '@angular/core';
import {TodoInterface} from '../interface/todo-interface';
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
                catchError(this.handleError('getTodos', []))
            )
    }

    deleteTodoItem(idItem: string): Observable<TodoInterface> {
        return this.http.delete<TodoInterface>(`${this.apiUrl}/${idItem}`)
            .pipe(
                tap(() => this.log('delete todo ' + idItem)),
                catchError(this.handleError<TodoInterface>('Error: '))
            )
    }
}
