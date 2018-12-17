import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

import { UserService, UserListResponse } from '../../../../core/services/api/user.service';
import { User } from '../../../../core/models/user.interface';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { CreateUserComponent } from '../../components/create-user/create-user.component';
import { PaginationOptions, SortOptions } from '../../components/user-table/user-table.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userDataSource: UserDataSource = null;
  userChanges: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  userPaginationOptions = { page: 0, size: 10};
  userSortOptions: SortOptions;
  totalUsers = 0;

  editUserDialogRef: MatDialogRef<EditUserComponent>;
  creatUserDialogRef: MatDialogRef<CreateUserComponent>;

  loading = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userDataSource = new UserDataSource(this.userChanges);

    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.userService.paginate(this.userPaginationOptions, this.userSortOptions)
      .finally(() => {
        this.loading = false;
      })
      .subscribe((response: UserListResponse) => {
        this.totalUsers = response.total;
        this.userChanges.next(response.users);
    });
  }

  handleUserClick(user: User) {
    this.editUserDialogRef = this.dialog.open(EditUserComponent, {
      width: '320px',
      data: {
        user,
        onSave: (id, editedUser) => {
          this.handleUserEdit(id, editedUser);
        },
        onDelete: (id) => {
          this.handleUserDelete(id);
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
      .finally(() => {
        this.loadUsers();
      })
      .subscribe(() => {
          this.snackbar.open('User was successfully updated', 'Dismiss');
        },
        error => {
          this.snackbar.open('Some error occurred while updating user', 'Dismiss');
        });
  }

  handleUserCreate(user: User) {
    this.creatUserDialogRef.close();
    this.userService.create(user)
      .finally(() => {
        this.loadUsers();
      })
      .subscribe(
        (response) => {
          this.snackbar.open('User was successfully created', 'Dismiss');
        },
        () => {
          this.snackbar.open('Some error occurred while creating user', 'Dismiss');
        }
      );
  }

  handleUserDelete(id: string) {
    this.editUserDialogRef.close();
    this.userService.delete(id)
      .finally(() => {
        this.loadUsers();
      })
      .subscribe(() => {
          this.snackbar.open('User was successfully updated', 'Dismiss');
        },
        error => {
          this.snackbar.open('Some error occurred while updating user', 'Dismiss');
        });
  }

  handlePaginationOptionsChanged(event: PaginationOptions) {
    this.userPaginationOptions = event;

    this.loadUsers();
  }

  handleSort(event: SortOptions) {
    this.userSortOptions = event;

    this.loadUsers();
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
