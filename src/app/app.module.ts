import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { HttpClientModule} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { FormsModule} from "@angular/forms";
import { AuthGuard } from "./services/Auth/auth-guard.service";
import { AuthService } from "./services/Auth/auth.service";

import { PropertyComponent } from './property/property.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AddPropertyComponent } from './add-property/add-property.component';
import { EmailsComponent } from './emails/emails.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { Template3Component } from './template3/template3.component';
import { MydataPipe } from './pipe/mydata.pipe';
import { ContactComponent } from './contact/contact.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AmenitiesComponent } from './amenities/amenities.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgmCoreModule } from '@agm/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { PreviewComponent } from './preview/preview.component';
import { SafePipe } from './preview/SafePipe.pipe';
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  declarations: [
    AppComponent,
    PropertyComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent,
    
    AddPropertyComponent,
    EmailsComponent,
    EditPropertyComponent,
    Template3Component,
    MydataPipe,
    ContactComponent,
    AmenitiesComponent,
    PreviewComponent,
    SafePipe
   
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    HttpModule,
    NgxPaginationModule,
    NgxFileDropModule,
    FormsModule,
    HttpClientModule,
    ScrollDispatchModule,
    DragDropModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC0P6y-iog1XBop8qfSesLRnFVxYBXPgow',
      libraries: ['places']
    }),
    LightboxModule
  ],
  providers: [AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
