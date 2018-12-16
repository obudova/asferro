import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RequestService } from '../request.service';

import { environment } from '../../environments/environment.custom';


export interface UserListResponse {
  total?: number;
  companies?: any;
}

@Injectable()
export class UserService {
  constructor(private requestService: RequestService) {
    console.log('service', environment);
  }

  list(): Observable<UserListResponse>  {
    return this.requestService.request(`localhost:8081`, 'GET');
  }
}
