import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService,private router : Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('userData'));
    console.log(localStorage.getItem('token'));
    var checkStorage = localStorage.getItem('token');
    console.log(checkStorage);
    if(checkStorage != null){
      if(checkStorage !== null || checkStorage.length > 10) {
        this.router.navigateByUrl("/home/dashboard");
      }
    }
   
  }

  onLogin(form: NgForm) {
    const value = form.value;
    const user  = { email:value.username, password:  value.password };

    this.loginService.login(user).subscribe(
      loginData => {
        console.log("Login Response",loginData);
        if (loginData.success == true) {
        
           localStorage.setItem("token", loginData.token);
           localStorage.setItem("userData", loginData.data);
           this.router.navigateByUrl("/home/dashboard");
        } 
        if (loginData.success == false) {
          alert( "Wrong username or password1");
          //swal("Error", "Wrong username or password", "error");
        }
      },
      error => {
        alert( "Wrong username or password2"+error);
       console.error(error);
       // swal("Error", "Wrong username or password", "error");
      }
    );
  }

}
