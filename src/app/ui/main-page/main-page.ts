import { Component, OnInit } from '@angular/core';
import { PowerControllerService } from '../../services/powercontroller-service';
import { PowerControllerList } from '../../models/powercontroller';
import { Controller } from '../../components/controller/controller.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-main-page',
  imports: [Controller],
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css'],
  providers: [PowerControllerService]
})
export class MainPage implements OnInit{
  public controllers?: PowerControllerList;

  constructor(private powerControllerService: PowerControllerService){
    console.log("MainPage component initializing.");
   }
  async ngOnInit(): Promise<void> {
    console.log("MainPage ngOnInit called.");
    console.log("Service name:", this.powerControllerService.servicename);
    this.controllers = this.powerControllerService.getSavedControllers()
    console.log("Received data from PowerControllerService:", this.controllers);
  }
}
