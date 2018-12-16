import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestService } from '../request.service';

import { environment } from '../../environments/environment.custom';

export interface User {
  name: string;
}


export interface UserListResponse {
  total?: number;
  companies?: any;
}

@Injectable()
export class UserService {
  dummyData = [
    {
      name: 'John Doe'
    }
  ];
  constructor(private requestService: RequestService) {
    console.log('service', environment);
  }

  list(): Observable<any>  {
    // return this.requestService.request(`localhost:8081`, 'GET');
    return Observable.of(this.dummyData);
  }
}
