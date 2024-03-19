import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError, interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  url:string= "https://bd03-102-16-180-147.ngrok-free.app";


  
  getApi() {
    return this.http.get(this.url + '/api').pipe(
      map((res: any) => {
        return  res['data'];
      }),
      catchError(this.handleError)
    );
  }

  
  getErrorList() {
    return this.http.get(this.url + '/api/error/list').pipe(
      map((res: any) => {
        return  res["data"];
      }),
      catchError(this.handleError)
    );
  }

  
  // Handle Error
  private handleError(error: HttpErrorResponse) {
    // return an observable with a user friendly message
    return throwError(error);
  }
}
