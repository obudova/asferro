import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog } from '@angular/material/dialog';

import { UserService, User } from '../../../../services/api/user.service';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  userDataSource: UserDataSource = null;
  userChanges: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userDataSource = new UserDataSource(this.userChanges);
    this.userService.list().subscribe((response: User[]) => {
      this.userChanges.next(response);
    });
  }

  handleUserClick(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '320px',
      data: {
        user
      }
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
