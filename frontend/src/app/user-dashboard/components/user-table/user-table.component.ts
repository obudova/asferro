import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent, Sort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { User } from '../../../../services/api/user.service';

export interface PaginationOptions {
  page: number;
  size: number;
}

export interface SortOptions {
  order_key: string;
  order_dir: string;
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  @Input()
  totalUsers: number;

  @Input()
  pageSize: number;
  @Input()
  pageIndex: number;

  @Input()
  sortKey?: string;
  @Input()
  sortOrder?: string;

  @Input()
  dataSource: DataSource<User[]>;

  @Output()
  rowClicked = new EventEmitter<User>();
  @Output()
  paginationOptionsChanged = new EventEmitter<PaginationOptions>();
  @Output()
  sortOptionsChanged = new EventEmitter<SortOptions>();

  displayedColumns = ['name', 'surname', 'birth_date', 'updated_at'];

  handleRowClick(user: User) {
    this.rowClicked.emit(user);
  }

  handlePageEvent(event: PageEvent) {
    const paginationOptions = { size: event.pageSize, page: event.pageIndex };

    this.paginationOptionsChanged.emit(paginationOptions);
  }

  handleSortEvent(event: Sort) {
    const sortOptions = { order_key: event.active, order_dir: event.direction};

    this.sortOptionsChanged.emit(sortOptions);
  }
}
