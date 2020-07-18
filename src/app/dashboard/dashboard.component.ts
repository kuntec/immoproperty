import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  active_property: any;
  inactive_property: any;
  total_user: any;
  template: any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllTotal();
  }

  getAllTotal(){
    this.dashboardService.propertyList().subscribe( (data) => { 
      console.log(data.message.length);
      this.active_property = data.message.length;
    })
    this.dashboardService.getDashboardTotal().subscribe(total => {
      console.log(total);
    //  this.active_property = total[0].active_property;
     this.inactive_property = total[0].inactive_property;
     this.template = total[0].template;
     this.total_user = total[0].total_user;

      })
  }

}
