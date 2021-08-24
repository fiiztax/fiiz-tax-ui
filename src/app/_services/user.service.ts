import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../_models';
import { UserRegister } from '../_models';
import FiiData from '../forms/FiiData';

@Injectable({ providedIn: 'root' })
export class UserService {
    userPost: UserRegister;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(user: User, UserR: UserRegister) {


        const headerOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Basic ' + btoa(user.username + ':' + user.password)
            })
        };


        const newContent = <UserRegister>({
            email: UserR.email,
            firstName: UserR.firstName,
            lastName: UserR.lastName
        });


        return this.http.post(`https://fiiztax.technology/auth/signup`,  newContent, headerOptions);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }
}
