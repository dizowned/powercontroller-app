import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Controller } from "../models/controller";
import { PowerControllerService } from './powercontroller-service';

@Injectable({
  providedIn: 'root'
})
export class NewControllerService {

  private dataSubject = new BehaviorSubject<Controller>(
  {name:"", url:"",
    channels:[
    {name:"",number:0,state:false}
    ]
  }
  );

  constructor(private powerControllerService: PowerControllerService) {}
  public currentData$ = this.dataSubject.asObservable();

  public addNewController(newData: Controller): boolean{
    if(this.powerControllerService.getControllerInfo(newData.url)){
      return true;
    }
    return false;
  }

}
