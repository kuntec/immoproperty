import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { AppSettings } from "./../appSettings";



const loginUrl = AppSettings.API_ENDPOINT + "/";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:Http) { }
  
  login(user:any){
     let headers = new Headers({ "Content-Type": "application/json" });
 
 return this.http
   .post(loginUrl + "login", user, { headers: headers })
   .map((response: Response) => response.json())
   .catch((error: Response) => {
     return Observable.throw(error.json());
   });
  }

  logout() {
    localStorage.clear();
  }
}
