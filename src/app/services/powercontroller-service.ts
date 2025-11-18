import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PowerController, PowerControllerList } from "../models/powercontroller";
@Injectable({
  providedIn: 'root'
})
export class PowerControllerService {

  private savedControllerList$!: Observable<PowerController[]>;
  private savedControllerUrl = 'assets/json/controller-list.json'
  public servicename: string = 'PowerControllerService';

  constructor(private http: HttpClient) {
    console.log("PowerControllerService - Initializing...");
    this.savedControllerList$ =  this.http.get<PowerController[]>(this.savedControllerUrl);
  }

  public addNewController(newData: PowerController){
  }

  public getSavedControllers(): Observable<PowerController []>{
    console.log("PowerControllerService - Returning saved controllers:", this.savedControllerList$);
    return this.savedControllerList$;
  }

}
