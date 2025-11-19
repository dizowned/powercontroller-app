import { Component, model, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PowerControllerService } from '../../services/powercontroller-service';
import { PowerControllerList, PowerController } from '../../models/powercontroller';
import { Controller } from '../../components/controller/controller.component';
import { finalize, delay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css'],
  imports: [Controller, CommonModule],
  providers: []
})
export class MainPage implements OnInit, OnChanges{
  public controllerlist!: PowerControllerList;
  displayControllers = model<PowerController[]>();

  constructor(private powerControllerService: PowerControllerService){
    console.log("MainPage component initializing.");
   }
  ngOnChanges(changes: SimpleChanges): void {
    this.controllerlist = changes['controllerlist'].currentValue;
    console.log("MainPage component OnChanges - controllerlist changed:", this.controllerlist);
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
      this.displayControllers.set([...this.controllerlist.controllers]);
    if(this.displayControllers.length > 0)
      return true;
    return false;
  }

}
