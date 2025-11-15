import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PowerController } from "../models/powercontroller";

@Injectable({
  providedIn: 'root'
})
export class NewControllerService {

  private dataSubject = new BehaviorSubject<PowerController>(
  {name:"", url:"",
    channels:[
    {name:"",number:0,state:false}
    ]
  }
  );

  public addNewController(newData: PowerController): boolean{
    return false;
  }

}
