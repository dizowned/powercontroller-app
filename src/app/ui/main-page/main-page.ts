import { Component, OnInit } from '@angular/core';
import { PowerControllerService } from '../../services/powercontroller-service';
import { extractControllers, PowerControllerList, PowerController } from '../../models/powercontroller';
import { Controller } from '../../components/controller/controller.component';
import { finalize, map, delay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css'],
  imports: [Controller, CommonModule],
  providers: []
})
export class MainPage implements OnInit{
  public controllerlist!: PowerControllerList;
  displayControllers: PowerController[] = [];
  public cname = '';
  public curl = ''

  constructor(private powerControllerService: PowerControllerService){
    console.log("MainPage component initializing.");
   }

   ngOnInit(): void {
    console.log("MainPage component OnInit - Fetching controllers from PowerControllerService.");
    this.powerControllerService.getSavedControllers()
      .pipe(
        delay(0), // Ensures asynchronous execution
        finalize(() => {
          console.log("MainPage component OnInit - Completed fetching controllers.");
          this.LoadControllers();
        })
      )
      .subscribe({
        next: (data: PowerController[]) => {
          this.controllerlist = { controllers: data };
          console.log("MainPage component OnInit - Controllers data received:", this.controllerlist);
        },
        error: (error: any) => {
          console.error("MainPage component OnInit - Error fetching controllers:", error);
        }
      });
  }

  LoadControllers(): boolean{
    console.log("MainPage component - Loading controllers:", this.controllerlist);
    extractControllers(this.controllerlist).forEach((controller) => {
      this.displayControllers.push(controller);
      console.log("Loaded \n Controller Name: " + controller.name + ", URL: " + controller.url + ", Channels: " + (controller.channels ? controller.channels.length : 0)  );
    });

    if(this.displayControllers.length > 0)
      return true;

    return false;
  }

}
