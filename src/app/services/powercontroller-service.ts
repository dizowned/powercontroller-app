import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { PowerController, PowerControllerList } from "../models/powercontroller";
@Injectable({
  providedIn: 'root',
})
export class PowerControllerService {
  public savedControllers? : PowerControllerList;
  private savedControllerUrl = 'assets/json/controller-list.json'
  public servicename: string = 'PowerControllerService';

  constructor(private http: HttpClient) {
    console.log("PowerControllerService Initializing...");
      this.http.get<PowerControllerList>(this.savedControllerUrl).subscribe(data => {
      this.savedControllers = data;
    });
      console.log("Fetched controllers:", this.savedControllers);

  }

  public addNewController(newData: PowerController){
  }

  public getSavedControllers(): PowerControllerList | undefined {
      this.http.get<PowerControllerList>(this.savedControllerUrl).subscribe(data => {
      this.savedControllers = data;
    });
    console.log("Returning saved controllers:", this.savedControllers);
    return this.savedControllers;
  }

}
