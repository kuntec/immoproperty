import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable ,Subject } from "rxjs";

import { AppSettings } from "./../appSettings";
const propertyUrl = AppSettings.API_ENDPOINT + "/";
@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(private http:Http) { }
  getAllEmail(){
    let headers = new Headers({ "Content-Type": "application/json"});
    return this.http.post(propertyUrl + "/getAllEmail",'',{ headers: headers })
    .map((response : Response)=> response.json())
    .catch((error : Response)=> {
      return Observable.throw(error.json());
    } )
  }
  addEmail(emailDetails: any) {
    let headers = new Headers({ "Content-Type": "application/json"});
    return this.http
       .post(propertyUrl + "addEmail", emailDetails, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }
   editEmail(emailDetails: any) {
    let headers = new Headers({ "Content-Type": "application/json"});
    return this.http
       .post(propertyUrl + "updateEmail", emailDetails, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }
   deleteEmail(deleteSetails: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "removeEmail", deleteSetails, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }
}
