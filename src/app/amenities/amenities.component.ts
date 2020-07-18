import { Component, OnInit } from '@angular/core';
import { AmenitiesService } from './amenities.service';
import { NgForm } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css'],
  providers : [ AmenitiesService ]
})
export class AmenitiesComponent implements OnInit {
  amenitiesList:any ={};
  responseMessage:String;
  templateId:any;
  p: number = 1;
  offset: number = 0;
  itemsPerPage: number = 5;
  total: number; 
  edit_details:any={};
  constructor(private amenitiesService : AmenitiesService) { }

  ngOnInit() {
    this.itemsPerPage = 10;  
    this.getAllAmenities();
  }

  getAllAmenities(){
    this.amenitiesService.getAllAmenities().subscribe( (data) => { 
      this.amenitiesList = data.data;
      this.total = data.data.length;
    })
  }
  addAmenities(form: NgForm){
    const value = form.value;
     const data = {
              name: value.add_name,
              };

   this.amenitiesService.addAmenities(data).subscribe(
     data => {       
       $("#modal-add").modal("hide");
       this.responseMessage = data.message
         $("#messageModel").modal("show");
        this.ngOnInit();
     },
     error => console.error(error)
   );
 }
 editAmenities(){
  
    const data = {
             amenitiesId: this.edit_details._id,
             name: this.edit_details.name
             };

  this.amenitiesService.editAmenities(data).subscribe(
    data => {       
      $("#modal-edit").modal("hide");
      this.responseMessage = data.message
        $("#messageModel").modal("show");
       this.ngOnInit();
    },
    error => console.error(error)
  );
}
deleteAmenities(){
  
 const data = {
          amenitiesId: this.edit_details._id,
           };

this.amenitiesService.deleteAmenities(data).subscribe(
 data => {       
   $("#modal-default").modal("hide");
   this.responseMessage = data.message
     $("#messageModel").modal("show");
    this.ngOnInit();
 },
 error => console.error(error)
);
}
 goEdit(amenities_detail: any) {
   this.edit_details = amenities_detail;
 //  localStorage.setItem("editPropery", JSON.stringify(property));
 
 }
 goDelete(amenities_detail: any) {
   this.edit_details = amenities_detail;
   //$("#modal-default").modal("show");
 }

}
