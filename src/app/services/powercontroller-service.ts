import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PowerControllerService {

  constructor(private http: HttpClient) { }

  getControllerInfo(controller_url: string): any {
    this.http.get<any>(controller_url);
    return true;
  }

}
