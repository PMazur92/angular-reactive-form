import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { User } from '../shared/classes/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;
  selectedUser: User;
  isLoading: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.users = this.userService.getUsers().pipe(finalize(() => this.isLoading = false));
    this.selectedUser = undefined;
  }

  select(user: User) {
    this.selectedUser = user;
  }

  header(id: number): string {
    return 'heading' + id;
  }

  collapse(id: number): string {
    return 'collapse' + id;
  }
}
