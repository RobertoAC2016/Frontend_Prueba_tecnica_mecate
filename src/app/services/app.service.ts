import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

import { IResp } from '../core/interfaces.interfaz';


@Injectable({
  providedIn: 'root'
})
export class AppService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  get_data():Observable<IResp> {
    return this.get<IResp>("data");
  }
}
