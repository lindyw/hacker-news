import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // hackerAPI url
    private BASE_URL = `https://hacker-news.firebaseio.com/v0`;

    constructor(
        private http: HttpClient
    ) { }

    getUserbyId(id: string): Observable<User> {
        return this.http.get<User>(`${this.BASE_URL}/user/${id}.json`)
    }
}
