import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class SecurityService {

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

    constructor(private http: HttpClient) {
    }

    register(user): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this.http.post<any>(this.apiUserUrl, user, httpOptions)
            .pipe(
                tap(() => this.log('New user register request')),
                catchError(this.handleError<any>(('Error register')))
            )
    }

    login(dataLogin): Observable<any> {

        return this.http.post<any>('http://localhost:3050/login/user', dataLogin)
            .pipe(
                tap(() => this.log('Login request')),
                catchError(this.handleError<any>(('Error login')))
            )
    }
}
