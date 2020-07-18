import { Component, OnInit, OnDestroy,NgZone,ElementRef, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { PropertyService } from './../property/property.service';
import { AmenitiesService } from './../amenities/amenities.service';
import { AppSettings } from './../appSettings';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
//const Basic_image_link = "http://3.136.125.218:3000/";
//const Basic_image_link = "http://localhost:3000/";

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit,OnDestroy {
   // Maps
   title: string = 'AGM project';
   latitude: number;
   longitude: number;
   zoom: number;
   address: string;
   private geoCoder;
   @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;
  // Maps

  public files: NgxFileDropEntry[] = [];
  Basic_image_url:String;
  primary : Boolean =true;
secondery : Boolean =false;
loading1 : Boolean =false;
loading2 : Boolean =false;
loading3 : Boolean =false;
loading4 : Boolean =false;
buttonHide : Boolean;
property_details:any ={};
filesNames:any =[];
videofilesNames:any =[];
pdffilesNames:any =[];
fpfilesNames:any =[];
image : Boolean;
responseMessage : String;
lat : String;
long : String;
imagefileSelected : any=[];
videofileSelected : any=[];
video_upload_type:any;
pdffileSelected : any=[];
fpfileSelected : any=[];
amenitiesList:any ={};
fileUpload = {status: '', message: '', filePath: ''};
error: string;
dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings = {};
  constructor(private propertyService : PropertyService,private amenitiesService : AmenitiesService,private router: Router,private mapsAPILoader: MapsAPILoader,private ngZone: NgZone) { }

  ngOnInit() {

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation(this.property_details);
      console.log('setCurrentLocation', this.property_details);
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //console.log('PLACE', place);
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.address = place.formatted_address;
          this.zoom = 12;
        });
      });
    });

    this.property_details.video_upload_type = String(this.property_details.video_upload_type);

    this.primary = true;
    this.secondery = false;
    this.buttonHide = true;
    this.image = false;
//    this.Basic_image_url = Basic_image_link;
    this.loading1 = false;
    this.loading2 = false;
    this.loading3 = false;
    this.loading4 = false;

    this.getAllAmenities();
      
  }
  ngOnDestroy(){}

  onItemSelect(item: any) {
    this.selectedItems.push(item);
    this.property_details.amenities= this.selectedItems;
    
  }
  onItemDeSelect(item: any) {
    var filtered = this.property_details.amenities.filter(function(value, index, arr){
          return value._id != item._id;
    });
    this.property_details.amenities = filtered;
    
  }
  onSelectAll(items: any) {
    this.property_details.amenities =items;
   
  }
  getAllAmenities(){
    this.amenitiesService.getAllAmenities().subscribe( (data) => { 
      this.amenitiesList = data.data;
      this.dropdownList = data.data;
      this.dropdownSettings  = {
        singleSelection: false,
        idField: '_id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true
      };
    
    })
  }
  addBasicDetails(form: NgForm){
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
      template: this.property_details.template,
      lang: this.property_details.lang,
      name: this.property_details.name,
      address: this.property_details.address,
      video_upload_type: this.property_details.video_upload_type,
      status: this.property_details.status,
      type: this.property_details.type,
      description: this.property_details.description,
      price: this.property_details.price,
      additional_information: this.property_details.additional_information,
      amenities: this.property_details.amenities,
      bedrooms: this.property_details.bedrooms,
      size: this.property_details.size,
      bathrooms: this.property_details.bathrooms,
      half_baths: this.property_details.half_baths,
      size_units: this.property_details.size_units,
      drone_360_view: this.property_details.drone_360_view,
      map_address: this.property_details.map_address,     
      lat: this.property_details.lat,
      long: this.property_details.long,
      virtual_tour: this.property_details.virtual_tour,
      seo_metatags: this.property_details.seo_metatags,
      analytics_code: this.property_details.analytics_code
     
    };

    this.propertyService.addBasicDetails(data,token).subscribe(
      data => {
        this.secondery = true;
        this.buttonHide = false;
        this.responseMessage = data.message
          $("#messageModel").modal("show");
          this.property_details = data.data;
        
      },
      error => console.error(error)
    );
  }

  imageFileEvent(event: any) {
   // this.imagefileSelected = event.target.files;
    for (var i = 0; i < event.target.files.length; i++) {
      this.imagefileSelected.push(event.target.files[i]);
    }
    var fileList =  event.target.files;
    for(let i=0;i<fileList.length;i++){
      this.filesNames.push(fileList[i].name);
    }
  }

  videoFileEvent(event: any) {
   
   //this.videofileSelected = event.target.files;
   for (var i = 0; i < event.target.files.length; i++) {
    this.videofileSelected.push(event.target.files[i]);
  }
    var fileList =  event.target.files;
    for(let i=0;i<fileList.length;i++){
      this.videofilesNames.push(fileList[i].name);
    }
  }

  fpFileEvent(event: any) {
    //this.fpfileSelected = event.target.files;
    for (var i = 0; i < event.target.files.length; i++) {
      this.fpfileSelected.push(event.target.files[i]);
    }
    var fileList =  event.target.files;
    for(let i=0;i<fileList.length;i++){
      this.fpfilesNames.push(fileList[i].name);
    }
  }

  pdfFileEvent(event: any) {
   // this.pdffileSelected = event.target.files;
   for (var i = 0; i < event.target.files.length; i++) {
    this.pdffileSelected.push(event.target.files[i]);
  }
    var fileList =  event.target.files;
    for(let i=0;i<fileList.length;i++){
      this.pdffilesNames.push(fileList[i].name);
    }
  }

  addPhotos(){
   
    if(this.imagefileSelected.length>0){
    const formData = new FormData();
    formData.append("templateId",this.property_details._id);
    for (var i = 0; i < this.imagefileSelected.length; i++) {
      formData.append("property_images", this.imagefileSelected[i]);
    }
   
    this.propertyService.addPhotos(formData).subscribe(
      // data => {
      //   this.loading1 = false;
      //    this.responseMessage = data.message
      //    $("#messageModel").modal("show");
      //   this.property_details = data.data;
        
      // },
      // error => console.error(error)
      res => {
        this.fileUpload = res;
        if(res.status == true){
          this.imagefileSelected =[];
          this.filesNames = [];
           this.responseMessage = res.message
           $("#messageModel").modal("show");
          this.property_details = res.data;
        }
          
        }    ,
      err => this.error = err,
    );
    }else{
     
      this.responseMessage = "Please Choose Photo First";
      $("#messageModel").modal("show");
    }
    
  }

  addVideo(){
  
    if(this.videofileSelected.length>0){   
    const formData = new FormData();
    formData.append("templateId",this.property_details._id);
    formData.append("video_upload_type",this.property_details.video_upload_type);   
    for (var i = 0; i < this.videofileSelected.length; i++) {
      formData.append("property_video", this.videofileSelected[i]);
    }
       
    this.propertyService.addVideo(formData).subscribe(
      // data => {
      //   this.loading2 = false;
      //    this.responseMessage = data.message
      //    $("#messageModel").modal("show");
      //   this.property_details = data.data;
        
      // },
      // error => console.error(error)
      res => {
        this.fileUpload = res;
        if(res.status == true){
          this.videofileSelected = [];
          this.videofilesNames = [];
           this.responseMessage = res.message
           $("#messageModel").modal("show");
          
          this.property_details = res.data;
          this.property_details.video_upload_type = String(this.property_details.video_upload_type);
          //console.log(this.property_details);
        }
          
        },
      err => this.error = err,
    );
  }else{
    
    this.responseMessage = "Please Choose Video First";
    $("#messageModel").modal("show");
  }
    
  }

  addFiles(){
    
    if(this.pdffileSelected.length>0){
    const formData = new FormData();
    formData.append("templateId",this.property_details._id);
    for (var i = 0; i < this.pdffileSelected.length; i++) {
      formData.append("documents", this.pdffileSelected[i]);
    }
    
    this.propertyService.addFiles(formData).subscribe(
      // data => {
      //   this.loading3 = false;
      //    this.responseMessage = data.message
      //    $("#messageModel").modal("show");
      //   this.property_details = data.data;
        
      // },
      // error => console.error(error)
      res => {
        this.fileUpload = res;
        if(res.status == true){
          this.pdffileSelected = [];
          this.pdffilesNames = [];
           this.responseMessage = res.message
           $("#messageModel").modal("show");
          this.property_details = res.data;
        }
          
        }    ,
      err => this.error = err,
    );
  }else{
    
    this.responseMessage = "Please Choose File First";
    $("#messageModel").modal("show");
  }
    
  }
  addFoorPlanImages(){
    
    if(this.fpfileSelected.length>0){
    const formData = new FormData();
    formData.append("templateId",this.property_details._id);
    for (var i = 0; i < this.fpfileSelected.length; i++) {
      formData.append("floorplan_images", this.fpfileSelected[i]);
    }
    
    this.propertyService.addFoorPlanImages(formData).subscribe(
      // data => {
      //   this.loading4 = false;
      //    this.responseMessage = data.message
      //    $("#messageModel").modal("show");
      //   this.property_details = data.data;
        
      // },
      // error => console.error(error)
      res => {
        this.fileUpload = res;
        if(res.status == true){
          this.fpfileSelected=[];
          this.fpfilesNames=[];
           this.responseMessage = res.message
           $("#messageModel").modal("show");
          this.property_details = res.data;
          
        }
          
        }    ,
      err => this.error = err,
    );
  }else{
    
    this.responseMessage = "Please Choose Floor Plan Images First";
    $("#messageModel").modal("show");
  }
    
  }

  addYoutubeVideo(){
   
    const data = {
      templateId: this.property_details._id,
      video_upload_type: this.property_details.video_upload_type,
      youtube_video: this.property_details.youtube_video
     };

    this.propertyService.addYoutubeVideo(data).subscribe(
      data => {
          this.responseMessage = data.message
          $("#messageModel").modal("show");
          this.property_details = data.data;
          this.property_details.video_upload_type = String(this.property_details.video_upload_type);
          //console.log(this.property_details);
          localStorage.setItem("editPropery", JSON.stringify(this.property_details));
        
      },
      error => console.error(error)
    );
  }

 addSeoData(){
   
    const data = {
      templateId: this.property_details._id,
      seo_metatags: this.property_details.seo_metatags,
      analytics_code: this.property_details.analytics_code
     };

    this.propertyService.addSeoData(data).subscribe(
      data => {
          this.responseMessage = data.message
          $("#messageModel").modal("show");
          this.property_details = data.data;
          localStorage.setItem("editPropery", JSON.stringify(this.property_details));
        
      },
      error => console.error(error)
    );
  }
  addVirtualTourData(){
   
    const data = {
      templateId: this.property_details._id,
      virtual_tour: this.property_details.virtual_tour
     };

    this.propertyService.addVirtualTourData(data).subscribe(
      data => {
          this.responseMessage = data.message
          $("#messageModel").modal("show");
          this.property_details = data.data;
          localStorage.setItem("editPropery", JSON.stringify(this.property_details));
        
      },
      error => console.error(error)
    );
  }

  addDrone360ViewData(){
   
    const data = {
      templateId: this.property_details._id,
      drone_360_view: this.property_details.drone_360_view
     };

    this.propertyService.addDrone360ViewData(data).subscribe(
      data => {
          this.responseMessage = data.message
          $("#messageModel").modal("show");
          this.property_details = data.data;
          localStorage.setItem("editPropery", JSON.stringify(this.property_details));
        
      },
      error => console.error(error)
    );
  }

  addMap(){
   
    const data = {
      templateId: this.property_details._id,
      map_address: this.property_details.map_address,      
      lat: this.property_details.lat,
      long: this.property_details.long
     };

    this.propertyService.addMap(data).subscribe(
      data => {
          this.responseMessage = data.message
          $("#messageModel").modal("show");
          this.property_details = data.data;
          localStorage.setItem("editPropery", JSON.stringify(this.property_details));
        
      },
      error => console.error(error)
    );
  }

  onClickSubmitMap(posted_data) {

    
    const data = {
      templateId: this.property_details._id,
      address: this.address,
      map_address: this.address,      
      lat: this.latitude,
      long: this.longitude
     };

    this.propertyService.addMap(data).subscribe(
      data => {
          this.responseMessage = data.message
          $("#messageModel").modal("show");
          this.property_details = data.data;
          localStorage.setItem("editPropery", JSON.stringify(this.property_details));
        
      },
      error => console.error(error)
    );

    //alert("Entered Email id : " + data.emailid); 
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(data))
    console.log('Longitute: ' + this.longitude);
    console.log(data);
 }

 markerDragEnd($event: MouseEvent) {
  console.log("map", $event);
  this.latitude = $event.coords.lat;
  this.longitude = $event.coords.lng;
  this.getAddress(this.latitude, this.longitude);
}

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


 // Get Current Location Coordinates
private setCurrentLocation(d) {
  /* if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 15;
    });
  } */
  
  console.log('long', d.long);

  this.latitude = parseFloat(d.lat);
  this.longitude = parseFloat(d.long);
  this.zoom = 15;
}


  addDomainName(){
    this.property_details.domain_name = this.property_details.domain_name.trim();
    const data = {
      templateId: this.property_details._id,
      domain_name: this.property_details.domain_name
     };

    this.propertyService.addDomainName(data).subscribe(
      data => {
        if(data.status == true){
          this.responseMessage = data.message
          $("#messageModel").modal("show");
          this.property_details = data.data;
          localStorage.setItem("editPropery", JSON.stringify(this.property_details));
        }else{
          this.responseMessage = data.message
          $("#messageModel").modal("show");
        }
          
        
      },
      error => console.error(error)
    );
  }

  public droppedImg(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
  
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
  
  
          this.imagefileSelected.push(file);
          this.filesNames.push(droppedFile.relativePath);
          console.log('FILENAME: ' + droppedFile.relativePath, file);
               console.log('Hello');
  
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public droppedVideoFile(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
  
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
  
  
  
          this.videofileSelected.push(file);
          this.videofilesNames.push(droppedFile.relativePath);
          console.log('FILENAME: ' + droppedFile.relativePath, file);
               console.log('Hello');
  
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public droppedFile(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
  
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
  
  
  
          this.pdffileSelected.push(file);
          this.pdffilesNames.push(droppedFile.relativePath);
          console.log('FILENAME: ' + droppedFile.relativePath, file);
               console.log('Hello');
  
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public droppedFloor(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
  
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
  
  
  
          this.fpfileSelected.push(file);
          this.fpfilesNames.push(droppedFile.relativePath);
          console.log('FILENAME: ' + droppedFile.relativePath, file);
               console.log('Hello');
  
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  
  public fileOver(event){
    console.log(event);
  }
  
  public fileLeave(event){
    console.log(event);
  }


  // Not in Use
  public changeVidType(event){
    var target = event.target;
      if (target.checked) {
        if(target.value == 1){
          this.video_upload_type = target.value;
        }else{
          this.video_upload_type = target.value;
        }
      }
    
  }

}
