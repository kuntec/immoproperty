import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ContactService } from './contact.service';
import { NgForm } from '@angular/forms';
declare var $:any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  ContactList:any ={};
  responseMessage:String;
  templateId:any;
  p: number = 1;
  offset: number = 0;
  itemsPerPage: number = 5;
  total: number; 
  edit_details:any={};
  constructor(private contactService : ContactService, private router:Router ) { }

  ngOnInit() {
    this.itemsPerPage = 10;  
   this.getAllContactUs();
  }


  getAllContactUs(){
    this.contactService.getAllContact().subscribe( (data) => { 
      this.ContactList = data.data;
      this.total = data.data.length;
    })
  }
  
  deleteContact(){
   
  const data = { contactId: this.edit_details._id };

this.contactService.deleteContact(data).subscribe(
  data => {       
    $("#modal-default").modal("hide");
    this.responseMessage = data.message
      $("#messageModel").modal("show");
     this.ngOnInit();
  },
  error => console.error(error)
);
}

  goDelete(email_detail: any) {
    this.edit_details = email_detail;
    //$("#modal-default").modal("show");
  }


}
