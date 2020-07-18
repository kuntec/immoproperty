import { Injectable } from '@angular/core';
import { AppSettings } from './../appSettings';
import { Http,Headers,Response } from '@angular/http';
import "rxjs/Rx";
import {Observable} from 'rxjs/Rx';


const templateUrl = AppSettings.API_ENDPOINT + "/";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  message: any[] = [];
  length: number;
  
  constructor(private http: Http) { }
  getData(res: Response) {
      return res.json().message;
  }

  getDashboardTotal(): Observable<any> {
    return this.http
      .get(templateUrl + "getAllTotal")
      .map(this.getData)
      .catch((error: Response) => {
        console.log(error);
        return Observable.throw(error.json());
      });
  }
  propertyList(){

    return this.http.get(templateUrl + "/getPropertyList")
    .map((response : Response)=> response.json())
    .catch((error : Response)=> {
      return Observable.throw(error.json());
    } )
  }
}
