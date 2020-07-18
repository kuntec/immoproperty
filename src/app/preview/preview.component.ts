import { Component, OnInit } from '@angular/core';
import { AppSettings } from "./../appSettings";
import { Lightbox } from 'ngx-lightbox';
import { ContactService } from '../contact/contact.service';
import { NgForm } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  property_details:any;
  floor_plans:any;
  base_image:string;
  virtual_tour:string;
  drone_360_view:string;
  youtube_video:string;
  gallary:any=[];
  floorPlansGallary:any=[];
  model:any={};
  responseMessage:any;
  constructor(private _lightbox: Lightbox,private contactService : ContactService) { }

  ngOnInit() {
    this.base_image = AppSettings.Image_Base_URL;
    var retrievedData = localStorage.getItem("propery");
    var propertyData = JSON.parse(retrievedData);
    
   this.property_details = propertyData;
   var uluru = {lat: this.property_details.lat, lng: this.property_details.long};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
   this.floor_plans = this.base_image+'images/'+this.property_details.photos[0];
   this.virtual_tour = this.property_details.virtual_tour;
   this.drone_360_view = this.property_details.drone_360_view;
   this.youtube_video = this.property_details.youtube_video;
   if(this.property_details.photos != ""){
    this.property_details.photos.forEach(element => {
      this.gallary.push({src: this.base_image+'images/'+element,caption: "",thumb: this.base_image+'images/'+element});
     });
   }
   if(this.property_details.floor_plans != ""){
    this.property_details.floor_plans.forEach(element => {
      this.floorPlansGallary.push({src: this.base_image+'images/'+element,caption: "",thumb: this.base_image+'images/'+element});
     });
   }
   
   console.log(this.floor_plans);
  }
  openGallary(index: number): void {
    // open lightbox
    this._lightbox.open(this.gallary, index);
  }
  openFloorPlansGallary(index: number): void {
    // open lightbox
    this._lightbox.open(this.floorPlansGallary, index);
  }
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  goHome(){
   
    $('html,body').animate({
      scrollTop: $(".HomeDive").offset().top},
      'slow');
  }
  goAbute(){
   
    $('html,body').animate({
      scrollTop: $(".AboutDive").offset().top},
      'slow');
  }
  goDetails(){
   
    $('html,body').animate({
      scrollTop: $(".DetailsDive").offset().top},
      'slow');
  }
  goGallery(){
   
    $('html,body').animate({
      scrollTop: $(".GalleryDive").offset().top},
      'slow');
  }
  goFloorPlansGallery(){
   
    $('html,body').animate({
      scrollTop: $(".FloorPlansGalleryDive").offset().top},
      'slow');
  }
  goVidoe(){
   
    $('html,body').animate({
      scrollTop: $(".VidoeDive").offset().top},
      'slow');
  }
  goVirtual(){
   
    $('html,body').animate({
      scrollTop: $(".VirtualDive").offset().top},
      'slow');
  }
  goDrone(){
   
    $('html,body').animate({
      scrollTop: $(".DroneDive").offset().top},
      'slow');
  }
  goDocuments(){
   
    $('html,body').animate({
      scrollTop: $(".DocumentsDive").offset().top},
      'slow');
  }
  goContact(){
   
    $('html,body').animate({
      scrollTop: $(".ContactDive").offset().top},
      'slow');
  }

  sendMessage(form: NgForm){
    var token = localStorage.getItem('token');
    //const value = form.value;
    // const formData = new FormData();
    // formData.append("template", value.template);
    // formData.append("name", value.name);
    // formData.append("address", value.address);
    // formData.append("status", value.status);
    // formData.append("type", value.type);
    // formData.append("description", value.description);
    // formData.append("additional_information", value.additional_information);
    // formData.append("amenities", value.amenities);
    // formData.append("bedrooms", value.bedrooms);
    // formData.append("size", value.size);
    // formData.append("map_address", value.map_address);
    // formData.append("virtual_tour", value.virtual_tour);
    const data = {
      email: this.model.email,
      phone: this.model.phone,
      name: this.model.name,
      message: this.model.message,
    };

    this.contactService.addContact(data).subscribe(
      data => {
        this.model={};
          $("#messageModel").modal("show");
          this.responseMessage = "Message Send Successfully";
        
      },
      error => console.error(error)
    );
  }
}
