import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import { PropertyService } from './property.service';
//import { ObservationService } from '../services/observation.service';
declare var $:any;


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
  providers : [ PropertyService ]
})
export class PropertyComponent implements OnInit {
  @Output() valueChange:EventEmitter<any> = new EventEmitter();
PropertyList:any;
CartCounter :any;
property_name:String;
responseMessage:String;
SITE_URL:String;
templateId:any;
p: number = 1;
offset: number = 0;
itemsPerPage: number = 5;
total: number; 
  constructor(private propertyService : PropertyService,private router:Router) { }

  ngOnInit() {
    this.itemsPerPage = 10;  
    this.propertyService.propertyList().subscribe( (data) => { this.PropertyList = data.message;
      
      var i = 1;
      this.PropertyList.forEach(function(value) {
          value.index = i;
          i++;
        }.bind(this)
      );
      //console.log(this.PropertyList);
      this.total = data.message.length;
      this.SITE_URL = 'nginxserver.info';
    })
  }

  Increment() {
    this.CartCounter= this.CartCounter+ 1 ;
    //this.observationService.counterUpdate.next(this.CartCounter);
    this.valueChange.emit(this.CartCounter);
  }

  goEdit(property: any) {
    localStorage.setItem("editPropery", JSON.stringify(property));
    // this.router.navigate(["/home/property/edit"]).then(() => {
    //   window.location.reload();
    // });
    this.router.navigate(["home/property/edit"]);
  }

  goPreview(property: any) {
    localStorage.setItem("propery", JSON.stringify(property));
    // this.router.navigate(["/home/property/edit"]).then(() => {
    //   window.location.reload();
    // });
    // this.router.navigate(["preview"]);
  }

  goDelete(property: any) {
    this.property_name =property.name;
    this.templateId =property._id;
    //localStorage.setItem("editPropery", JSON.stringify(property));
    $("#messageModelDelete").modal("show");
  }
  goView(property: any) {
    localStorage.setItem("editPropery", JSON.stringify(property));
    this.router.navigate(["/home/property/edit"]);
  }
  deleteProperty(){

    const data = { templateId: this.templateId };

    this.propertyService.deleteProperty(data).subscribe(
      data => {
       
        this.responseMessage = data.message;
          $("#messageModel").modal("show");
          this.ngOnInit();
        },
      error => console.error(error)
    );
  }
  goTemplate(property: any) {
    localStorage.setItem("viewPropery", JSON.stringify(property));
    //this.propertyService.template_id.next(property._id);
    this.router.navigate(["/template3"]);
  }

  
}
