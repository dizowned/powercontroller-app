import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PowerController, PowerControllerList } from "../models/powercontroller";
@Injectable({
  providedIn: 'root'
})
export class PowerControllerService {

  private savedControllerList$!: Observable<PowerController[]>;
  private savedControllerUrl = 'assets/json/controller-list.json'
  private storedControllers: PowerController[] = [];
  private storedControllersData: PowerController[] = JSON.parse(localStorage.getItem("ControllerList") || '[]');
  public servicename: string = 'PowerControllerService';

  constructor(private http: HttpClient) {
    console.log("PowerControllerService - Initializing...");
    this.savedControllerList$ =  this.http.get<PowerController[]>(this.savedControllerUrl);
    this.savedControllerList$.subscribe(data => {
      this.storedControllers = data;
      data.forEach(controller => {
        this.storedControllers.push({id: controller.id, name: controller.name, url: controller.url, channels: (controller.channels ? controller.channels : []) });
      });
      localStorage.setItem("ControllerList", JSON.stringify(this.storedControllers));
      console.log("PowerControllerService - Data from:", this.savedControllerUrl);
      console.log("PowerControllerService - Data in Local Storage:", this.storedControllersData);
    });
  }
  public addNewController(newData: PowerController){
    console.log("Updating controller List:", this.storedControllersData);
    this.storedControllersData.push({id: newData.id, name: newData.name, url: newData.url, channels: (newData.channels ? newData.channels : [])});
    localStorage.setItem("ControllerList", JSON.stringify(this.storedControllersData));
    console.log("PowerControllerService - New controller added:", newData);
  }

  public getSavedControllers(): Observable<PowerController []>{
    console.log("PowerControllerService - Returning saved controllers:", this.savedControllerList$);
    return this.savedControllerList$;
  }

}
