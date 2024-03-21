import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private headers:any;

  constructor(protected http: HttpClient) {
      if (!environment.production) {
          console.log('DEBUG MODE ', environment.apiUrl);
      }
  }

  /**
   * GET
   * @param method Nombre del metodo
   */
  protected get<T>(method: string): Observable<any> {
      return this.http.get<T>(environment.apiUrl + method, { headers: this.headers });
  }

  /**
   * POST
   * @param method Nombre del metodo
   * @param args Argumentos
   */
  protected post<T>(method: string, args: Object, options?: any): any {
    this.headers = {
      "token": localStorage.getItem("token")
    }
      return this.http.post<T>(
          environment.apiUrl + method,
          args,
          { headers: this.headers }
      );
  }

  /**
   * PUT
   * @param method Nombre del metodo
   * @param args Argumentos
   */
  protected put<T>(method: string, args: Object): any {
      return this.http.put<T>(
          environment.apiUrl + method,
          args
      );
  }

  /**
   * POST
   * @param method Nombre del metodo
   * @param args Argumentos
   */
  protected delete<T>(method: string, args: Object, options?: any): any {
      const nOptions = Object.assign(options || {}, { body: args });
      return this.http.delete<T>(
          environment.apiUrl + method,
          nOptions
      );
  }
}
