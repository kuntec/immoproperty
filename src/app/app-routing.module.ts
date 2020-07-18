import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/Auth/auth-guard.service';
import { PropertyComponent } from "./property/property.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
//import { Template1Component } from "./template1/template1.component";
//import { Template2Component } from "./template2/template2.component"
import { Template3Component } from "./template3/template3.component";
import { AddPropertyComponent } from "./add-property/add-property.component";
import { EmailsComponent } from "./emails/emails.component";
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { ContactComponent } from "./contact/contact.component";
import { AmenitiesComponent } from "./amenities/amenities.component";
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "preview",
    component: PreviewComponent
  },
  {
    path: "login",
    component: LoginComponent,
    
  },{
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children :[{
      path: "property",
      component: PropertyComponent
    },
    {
      path: "property/add",
      component: AddPropertyComponent
    },{
      path :"property/edit",
      component : EditPropertyComponent
    },
    {
      path: "dashboard",
      component: DashboardComponent
    },
    {
      path: "emails",
      component: EmailsComponent
    },
    {
      path: "contacts",
      component: ContactComponent
    },
    {
      path: "amenities",
      component: AmenitiesComponent
    }
  ] 
  },
  // {
  //   path: "template1",
  //   component: Template1Component
  // },
  // {
  //   path: "template2",
  //   component: Template2Component
  // },
  {
    path: ":name",
    component: Template3Component
  },
  {
    path: "template3",
    component: Template3Component
  }
 
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
 