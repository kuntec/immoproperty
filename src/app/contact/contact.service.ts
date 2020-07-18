import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable ,Subject } from "rxjs";

import { AppSettings } from "./../appSettings";
const propertyUrl = AppSettings.API_ENDPOINT + "/";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:Http) { }
  getAllContact(){
    let headers = new Headers({ "Content-Type": "application/json"});
    return this.http.post(propertyUrl + "/getAllContact",'',{ headers: headers })
    .map((response : Response)=> response.json())
    .catch((error : Response)=> {
      return Observable.throw(error.json());
    } )
  }
  addContact(contactDetails: any) {
    let headers = new Headers({ "Content-Type": "application/json"});
    return this.http
       .post(propertyUrl + "addContact", contactDetails, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }
  
   deleteContact(deleteContact: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "removecontact", deleteContact, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }
}
