import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

  constructor() { }
    public counterUpdate = new BehaviorSubject(null);

}
