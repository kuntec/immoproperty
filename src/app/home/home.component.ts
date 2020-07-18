import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservationService } from '../services/observation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  CartCounter :any;
  subscription:Subscription;
  constructor(private observationService:ObservationService) { }

  ngOnInit() {
    this.CartCounter = 10;
    this.subscription = this.observationService.counterUpdate.asObservable().subscribe((data) => {
     
      this.CartCounter = data;
    })
  }
  displayCart(conter){
    this.CartCounter = conter;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
