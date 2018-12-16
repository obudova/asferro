import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MakeRequestOptions, RequestService } from '../request.service';

import { environment } from '../../environments/environment.custom';

export interface User {
  id: number;
  name: string;
  surname: string;
  birth_date: number;
  phone_number: number;
  email: string;
  edited_at: number;
  created_at: number;
}


export interface UserListResponse {
  total?: number;
  users?: any;
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
    // return this.requestService.request(`localhost:8081`, 'GET');
    return Observable.of(this.dummyData);
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
}
