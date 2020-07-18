import { Component, OnInit,ViewChild  } from '@angular/core';
import { PropertyService } from '../property/property.service';
import { ContactService } from '../contact/contact.service';
import { NgForm } from '@angular/forms';
import {
  Router,
  NavigationEnd,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from "@angular/router";
declare var $:any;

import { AppSettings } from './../appSettings';
const Basic_image_link = "http://localhost:3000/";
//const Basic_image_link = "http://3.136.125.218:3000/";

@Component({
  selector: 'app-template3',
  templateUrl: './template3.component.html',
  styleUrls: ['./template3.component.css']
})
export class Template3Component implements OnInit {
  Basic_image_url:String;
  background_image:String;
  responseMessage:String;
  template_details:any={};
  map_address:any;
  virtual_tour:any;
  route: ActivatedRouteSnapshot;
  getData:String;
  total: number; 
  constructor(private propertyService:PropertyService,private contactService:ContactService, private router: Router, private route1: ActivatedRoute) {
    // this.propertyService.template_id.subscribe(temp_id=>{
    //   this.template_id = temp_id;
    // })
  }
  

  ngOnInit() {
     var retrievedData = localStorage.getItem("viewPropery");
     var propertyData = JSON.parse(retrievedData);
   
   if(propertyData){
    this.template_details = propertyData;
    this.background_image = Basic_image_link+"/images/"+this.template_details.photos[0];
    this.Basic_image_url = Basic_image_link;

   }else{
   this.route1.params.subscribe(params=>{
    if(params["name"]){
    this.getData=params["name"];
    const data = {
      domain_name: this.getData,
     
    };
    this.propertyService.getPropertyByDomain(data).subscribe( (data1) => { 
     
      this.template_details = data1.data[0];
      this.background_image = Basic_image_link+"/images/"+this.template_details.photos[0];
      this.Basic_image_url = Basic_image_link;
      
    })
    }
  })
 
}
  }
  addContact(form: NgForm){
    const value = form.value;
     const data = {
              name: value.name,
              email: value.email,
              phone: value.phone,
              message: value.message,
              };

   this.contactService.addContact(data).subscribe(
     data => {       
      
       this.responseMessage = data.message;
       form.resetForm();
         $("#messageModel").modal("show");
        
        this.ngOnInit();
     },
     error => console.error(error)
   );
 }
  

}
