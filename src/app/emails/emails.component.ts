import { Component, OnInit } from '@angular/core';
import { EmailsService } from './emails.service';
import { NgForm } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css'],
  providers : [ EmailsService ]
})
export class EmailsComponent implements OnInit {
  EmailsList:any ={};
  responseMessage:String;
  templateId:any;
  p: number = 1;
  offset: number = 0;
  itemsPerPage: number = 5;
  total: number; 
  edit_details:any={};
  constructor(private emailsService : EmailsService) { }

  ngOnInit() {
    this.itemsPerPage = 10;  
   this.getAllEmail();
  }


  getAllEmail(){
    this.emailsService.getAllEmail().subscribe( (data) => { 
      this.EmailsList = data.data;
      this.total = data.data.length;
    })
  }
  addEmail(form: NgForm){
     const value = form.value;
      const data = {
               name: value.add_name,
               email: value.add_email,
               };

    this.emailsService.addEmail(data).subscribe(
      data => {       
        $("#modal-add").modal("hide");
        this.responseMessage = data.message
          $("#messageModel").modal("show");
         this.ngOnInit();
      },
      error => console.error(error)
    );
  }
  editEmail(){
   
     const data = {
              emailId: this.edit_details._id,
              name: this.edit_details.name,
              email: this.edit_details.email
              };

   this.emailsService.editEmail(data).subscribe(
     data => {       
       $("#modal-edit").modal("hide");
       this.responseMessage = data.message
         $("#messageModel").modal("show");
        this.ngOnInit();
     },
     error => console.error(error)
   );
 }
 deleteEmail(){
   
  const data = {
           emailId: this.edit_details._id,
            };

this.emailsService.deleteEmail(data).subscribe(
  data => {       
    $("#modal-default").modal("hide");
    this.responseMessage = data.message
      $("#messageModel").modal("show");
     this.ngOnInit();
  },
  error => console.error(error)
);
}
  goEdit(email_detail: any) {
    this.edit_details = email_detail;
  //  localStorage.setItem("editPropery", JSON.stringify(property));
  
  }
  goDelete(email_detail: any) {
    this.edit_details = email_detail;
    //$("#modal-default").modal("show");
  }

}
