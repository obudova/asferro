import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { UserService, User } from '../../../../services/api/user.service';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { CreateUserComponent } from '../../components/create-user/create-user.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  userDataSource: UserDataSource = null;
  userChanges: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  editUserDialogRef: MatDialogRef<EditUserComponent>;
  creatUserDialogRef: MatDialogRef<CreateUserComponent>;
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
    this.editUserDialogRef = this.dialog.open(EditUserComponent, {
      width: '320px',
      data: {
        user,
        onSave: (id, editedUser) => {
          this.handleUserEdit(id, editedUser);
        }
      }
    });
  }

  handleAddUserClick() {
    this.creatUserDialogRef = this.dialog.open(CreateUserComponent, {
      width: '320px',
      data: {
        onCreate: (user) => {
          this.handleUserCreate(user);
        }
      }
    });
  }

  handleUserEdit(id: number, user: User) {
    this.editUserDialogRef.close();
    this.userService.update(id, user)
      .subscribe(() => {
        console.log('success');
        },
        error => {
        console.log(error);
        });
  }

  handleUserCreate(user: User) {
    this.creatUserDialogRef.close();
    this.userService.create(user)
      .subscribe(
        (response) => {
          console.log('User was successfully created');
        },
        () => {
          console.log('Error while creating user');
        }
      )
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
