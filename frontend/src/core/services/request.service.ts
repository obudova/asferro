import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

export interface MakeRequestOptions {
  params?: object;
  data?: object;
  responseType?: any;
}

@Injectable()
export class RequestService {
  constructor(private http: HttpClient) { }

  static encodeURLParams(params: object = {}): HttpParams {
    let urlParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        if (value) {
          urlParams = urlParams.set(key, value);
        }
      }
    }

    return urlParams;
  }

  request(url: string, method = 'GET', requestOptions: MakeRequestOptions = { params: {}, data: {} }): Observable<any> {
    const { params, data, ...rest } = requestOptions;

    return this.http.request(method, url, {
      params: RequestService.encodeURLParams(params),
      body: data,
      ...rest
    }).catch(err => Observable.throw(err));
  }
}
