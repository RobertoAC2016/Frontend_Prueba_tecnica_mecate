import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

import { DataStat, IResp } from '../core/interfaces.interfaz';


@Injectable({
  providedIn: 'root'
})
export class AppService extends BaseService {

  get_data():Observable<IResp> {
    return this.get<IResp>("data");
  }

  get_data_flights():Observable<DataStat> {
    return this.get<DataStat>("vuelos");
  }
}
