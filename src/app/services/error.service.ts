import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError() {
    return (err: any): Observable<any> => {
      alert(err);
      // console.log(err);
      return of(err);
    };
  }
}
