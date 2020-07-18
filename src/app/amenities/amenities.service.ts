import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable ,Subject } from "rxjs";

import { AppSettings } from "./../appSettings";
const propertyUrl = AppSettings.API_ENDPOINT + "/";

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {

  constructor(private http:Http) { 

  }
  getAllAmenities(){
    let headers = new Headers({ "Content-Type": "application/json"});
    return this.http.post(propertyUrl + "getAllAmenities",'',{ headers: headers })
    .map((response : Response)=> response.json())
    .catch((error : Response)=> {
      return Observable.throw(error.json());
    } )
  }
  addAmenities(emailDetails: any) {
    let headers = new Headers({ "Content-Type": "application/json"});
    return this.http
       .post(propertyUrl + "addAmenities", emailDetails, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }
   editAmenities(emailDetails: any) {
    let headers = new Headers({ "Content-Type": "application/json"});
    return this.http
       .post(propertyUrl + "updateAmenities", emailDetails, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }
   deleteAmenities(deleteSetails: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "removeAmenities", deleteSetails, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }
}
