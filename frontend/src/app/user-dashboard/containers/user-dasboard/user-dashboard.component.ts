import { Component, OnInit } from '@angular/core';

import { UserService, User } from '../../../../services/api/user.service';
import { DataSource } from "@angular/cdk/table";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  userDataSource: UserDataSource = null;
  userChanges: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userDataSource = new UserDataSource(this.userChanges);
    this.userService.list().subscribe((response: User[]) => {
      this.userChanges.next(response);
    });
  }
}

class UserDataSource extends DataSource<any> {
  constructor (private userChanges: Observable<User[]>) {
    super();
  }

  connect(): Observable<User[]> {
    return this.userChanges;
  }

  disconnect() {}
}
