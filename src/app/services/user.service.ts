import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from '../shared/classes/user';
import { users } from '../shared/data/data-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  getUsers(): Observable<User[]> {
    return of(users);
  }

  updateUser(user: User): Observable<User> {
    const oUser = users.find(u => u.id === user.id);
    const nUser = Object.assign(oUser, user);
    return of(nUser);
  }
}
