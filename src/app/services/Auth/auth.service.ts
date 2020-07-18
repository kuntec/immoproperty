import { Http, Headers ,Response } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/Rx";
import { Observable,Subject } from "rxjs";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AppSettings } from "../../appSettings";
const resUrl = AppSettings.API_ENDPOINT + "/users/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http, private router: Router) { }

  Login(user: any) {
    const body = JSON.stringify(user);
    const headers = new Headers({ "Content-Type": "application/json" });
    return this.http
      .post(resUrl + "login", body, { headers: headers })
      .pipe(map((response: Response) => response.json()))
      .pipe(catchError((error: Response) => {
        return Observable.throw(error.json());
      }));
  }

  isLoggedIn(){
    if(localStorage.getItem("token")){
      return localStorage.getItem("token") !== null;
    }else if(localStorage.getItem("restoken")){
      return localStorage.getItem("restoken") !== null;
    }else{
      return localStorage.getItem("token") !== null;
    }
  }
}
