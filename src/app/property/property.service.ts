import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType ,HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
import { throwError } from 'rxjs';
import { Observable ,Subject } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { AppSettings } from "./../appSettings";
//import { NgForm } from '@angular/forms';


const propertyUrl = AppSettings.API_ENDPOINT + "/";
@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http:Http,
    private httpClient: HttpClient ) { }
template_id =new  Subject<any>();
  propertyList(){

    return this.http.get(propertyUrl + "getPropertyList")
    .map((response : Response)=> response.json())
    .catch((error : Response)=> {
      return Observable.throw(error.json());
    } )
  }
  addBasicDetails(basicDetails: any,token:any) {
   //  const body = JSON.stringify(basicDetails);
  
    let headers = new Headers({ "Content-Type": "application/json"});
   
    return this.http
      .post(propertyUrl + "addBasicDetails", basicDetails, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }
  // addPhotos(photos: FormData) {
  //   // const body = JSON.stringify(photos);
  // //  let headers = new Headers({ "Content-Type": "application/json" });
  //    const headers = new Headers();
   
  //    return this.http
  //      .post(propertyUrl + "updatePhotos", photos, { headers: headers })
  //      .map((response: Response) => response.json())
  //      .catch((error: Response) => {
  //        return Observable.throw(error.json());
  //      });
 
  //  }
  addPhotos(photos: FormData) {

    const headers = new HttpHeaders();
  
var url =propertyUrl + "updatePhotos";
      return this.httpClient.post<any>(`${url}`, photos, { headers: headers,
        reportProgress: true,
        observe: 'events'
      }).pipe(
        map(event => this.getEventMessage(event, photos)),
        catchError(this.handleError)
      );
  }


  private getEventMessage(event: HttpEvent<any>, formData) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
		break;
      case HttpEventType.Response:
        return this.apiResponse(event);
		break;
      default:
        return `File surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
     // console.log(error);
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }


  addVideo(video: FormData) {
    //  const headers = new Headers();
   
    //  return this.http
    //    .post(propertyUrl + "updateVideo", video, { headers: headers })
    //    .map((response: Response) => response.json())
    //    .catch((error: Response) => {
    //      return Observable.throw(error.json());
    //    });

       const headers = new HttpHeaders();
  
var url =propertyUrl + "updateVideo";
      return this.httpClient.post<any>(`${url}`, video, { headers: headers,
        reportProgress: true,
        observe: 'events'
      }).pipe(
        map(event => this.getEventMessage(event, video)),
        catchError(this.handleError)
      );
   }

   

   addFiles(files: FormData) {
    // const headers = new Headers();
   
    //  return this.http
    //    .post(propertyUrl + "updateDocuments", files, { headers: headers })
    //    .map((response: Response) => response.json())
    //    .catch((error: Response) => {
    //      return Observable.throw(error.json());
    //    });

       const headers = new HttpHeaders();
  
var url =propertyUrl + "updateDocuments";
      return this.httpClient.post<any>(`${url}`, files, { headers: headers,
        reportProgress: true,
        observe: 'events'
      }).pipe(
        map(event => this.getEventMessage(event, files)),
        catchError(this.handleError)
      );
   }

   addFoorPlanImages(fpImages: FormData) {
    //  const headers = new Headers();
   
    //  return this.http
    //    .post(propertyUrl + "updateFoorplanImages", fpImages, { headers: headers })
    //    .map((response: Response) => response.json())
    //    .catch((error: Response) => {
    //      return Observable.throw(error.json());
    //    });

       const headers = new HttpHeaders();
  
       var url =propertyUrl + "updateFoorplanImages";
             return this.httpClient.post<any>(`${url}`, fpImages, { headers: headers,
               reportProgress: true,
               observe: 'events'
             }).pipe(
               map(event => this.getEventMessage(event, fpImages)),
               catchError(this.handleError)
             );
   }
   editBasicDetails(editbasicDetails: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "updateBasicDetails", editbasicDetails, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }

   deleteProperty(deleteData: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "delete", deleteData, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }

   deleteOne(deleteDataOne: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "deleteOne", deleteDataOne, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }

   ordering(orderedData: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "ordering", orderedData, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }

   addSeoData(edityoutube: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "addSeoData", edityoutube, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }

   addVirtualTourData(edityoutube: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "addVirtualTourData", edityoutube, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }

   addDrone360ViewData(edityoutube: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "addDrone360ViewData", edityoutube, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }

   addMap(edityoutube: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "addMap", edityoutube, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }
   addYoutubeVideo(edityoutube: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "updateYoutubeVideo", edityoutube, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }

   getPropertyByDomain(data: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "getPropertyByDomain", data, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }
   addDomainName(editdomain: any) {
    //  const body = JSON.stringify(basicDetails);
     let headers = new Headers({ "Content-Type": "application/json" });
     //const headers = new Headers();
     return this.http
       .post(propertyUrl + "addDomain", editdomain, { headers: headers })
       .map((response: Response) => response.json())
       .catch((error: Response) => {
         return Observable.throw(error.json());
       });
   }

}
