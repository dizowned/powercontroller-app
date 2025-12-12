import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { PowerController, PowerControllerList } from "../models/powercontroller";
@Injectable({
  providedIn: 'root'
})
export class PowerControllerService {

  public servicename: string = 'PowerControllerService';

  private savedControllerList$!: Observable<PowerController[]>;
  private savedControllerJSON = 'assets/json/controller-list.json'

  private serverControllerList$!: Observable<PowerController[]>;
  private serverControllerUrl = 'http://localhost:3000/controllers'

  private allControllersList$!: Observable<PowerController[]>;

  private storedControllers: PowerController[] = [];

  constructor(private http: HttpClient) {
    console.log(this.servicename + " - Initializing...");

    console.log(this.servicename + " - Fetching any controllers from local JSON:", this.savedControllerJSON);
    this.savedControllerList$ = this.http.get<PowerController[]>(this.savedControllerJSON).pipe(
      catchError(error => {
        console.error(this.servicename + " - Failed to fetch from local JSON:", error);
        return of([]); // Return empty array on error
      })
    );
    this.savedControllerList$.subscribe(data => {
      console.log(this.servicename + " - Fetched controllers from local JSON:", data);
      data.forEach(controller => {
        this.storedControllers.push({id: controller.id, name: controller.name, url: controller.url, channels: (controller.channels ? controller.channels : []) });
        console.log(this.servicename + " - Loaded controller from local JSON:", controller);
      });
    });

    console.log(this.servicename + " - Fetching any controllers from local Server:", this.serverControllerUrl);
    this.serverControllerList$ = this.http.get<PowerController[]>(this.serverControllerUrl).pipe(
      catchError(error => {
        console.error(this.servicename + " - Failed to fetch from server:", error);
        return of([]); // Return empty array on error
      })
    );

    this.serverControllerList$.subscribe(data => {
      console.log(this.servicename + " - Fetched controllers from Server:", data);
      data.forEach(controller => {
        this.storedControllers.push({id: controller.id, name: controller.name, url: controller.url, channels: (controller.channels ? controller.channels : []) });
        console.log(this.servicename + " - Loaded controller from Server:", controller);
      });
    }
  );

    localStorage.setItem("ControllerList", JSON.stringify(this.storedControllers));
    console.log(this.servicename + " - Data in Local Storage after fetches:", this.storedControllers);

    this.allControllersList$ = combineLatest<[PowerController[], PowerController[]]>([this.savedControllerList$, this.serverControllerList$]).pipe(
      map(([savedControllers, serverControllers]) => {
        // Ensure arrays are defined (defensive check)
        const saved = savedControllers || [];
        const server = serverControllers || [];
        const controllers = [...saved, ...server];
        console.log(this.servicename + " - Combined controller list:", controllers);
        return controllers;
      })
    );

  }

  public addNewController(newData: PowerController){
    console.log("Updating controller List:", this.storedControllers);
    this.storedControllers.push({id: newData.id, name: newData.name, url: newData.url, channels: (newData.channels ? newData.channels : [])});
    localStorage.setItem("ControllerList", JSON.stringify(this.storedControllers));
    console.log(this.servicename + " - New controller added:", newData);
  }

  public getSavedControllers(): Observable<PowerController []>{
    console.log(this.servicename + " - Returning Controllers from JSON:", this.savedControllerList$);
    console.log(this.servicename + " - Returning Controllers from Server:", this.serverControllerList$);
    return this.allControllersList$;
  }

  /**
   * Set channel state on server for a given controller and channel number
   * Assumes server route: POST /controllers/:controllerId/channels/:channelNo/state
   * Body: { state: boolean }
   */
  public setChannelState(controllerId: number, channelNo: number, state: boolean): Observable<{ success: boolean; state: boolean }>{
    const url = `http://localhost:3000/controllers/${controllerId}/channels/${channelNo}/state`;
    console.log(this.servicename + ` - Setting state for controller ${controllerId} channel ${channelNo} -> ${state}`);
    return this.http.post<{ success: boolean; state: boolean }>(url, { state }).pipe(
      tap(resp => console.log(this.servicename + ' - Server response for setChannelState:', resp)),
      catchError(err => {
        console.error(this.servicename + ' - Error setting channel state:', err);
        return of({ success: false, state });
      })
    );
  }

}
