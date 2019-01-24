import {Injectable} from '@angular/core';
import {UserInterface} from "../inteface/user-interface";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private apiUserUrl = 'http://localhost:3050/user';

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

    addTodoToUser(idUser, todo): Observable<any> {
        return this.http.put(`${this.apiUserUrl}/${idUser}`, todo, {responseType: 'text'})
            .pipe(
                tap(() => this.log('Update user and add todo')),
                catchError(this.handleError<any>(('Error addTodoToUser')))
            )
    }

    getUsers(): Observable<UserInterface[]> {
        return this.http.get<UserInterface[]>(this.apiUserUrl)
            .pipe(
                tap(() => this.log('Fetched Users')),
                catchError(this.handleError<UserInterface[]>('getUsers', []))
            )
    }
}
