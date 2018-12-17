import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MakeRequestOptions, RequestService } from '../request.service';

import { environment } from '../../../environments/environment.custom';
import { PaginationOptions } from '../../../app/user-dashboard/components/user-table/user-table.component';
import { User } from '../../models/user.interface';


export interface UserListResponse {
  total?: number;
  users?: User[];
}

@Injectable()
export class UserService {
  dummyData = [
    {
      id: 0,
      name: 'John Doe'
    }
  ];
  apiUrl: string;
  constructor(private requestService: RequestService) {
    this.apiUrl = environment.API_HOST + ':' + environment.PORT + '/api/users';
  }

  list(): Observable<any>  {
    return Observable.of(this.dummyData).delay(400);
  }

  paginate(paginationOptions: PaginationOptions, sortOptions?, options?: MakeRequestOptions): Observable<any> {
    const params = {
      ...paginationOptions,
      ...sortOptions
    };

    return this.requestService.request(`${this.apiUrl}`, 'GET', {
      ...options,
      params
    });
  }

  create(entity: any, options?: MakeRequestOptions): Observable<any> {
    return this.requestService.request(`${this.apiUrl}`, 'POST', {
      responseType: 'blob',
      ...options,
      data: entity
    });
  }

  update(id: any, entity: any, options?: MakeRequestOptions): Observable<any> {
    return this.requestService.request(`${this.apiUrl}/${id}`, 'PUT', {
      responseType: 'blob',
      ...options,
      data: entity
    });
  }

  delete(id: any, options?: MakeRequestOptions): Observable<any> {
    return this.requestService.request(`${this.apiUrl}/${id}`, 'DELETE', {
      responseType: 'blob',
      ...options
    });
  }
}
