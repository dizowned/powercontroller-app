import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { channel } from '../channel/channel.component';
@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [],
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class Controller {
 noChannels: number = 10;
 controllerName: string = 'Power Controller';

setControllerName(name: string){
  this.controllerName = name;
}

setControllerNoChannels(channels: number){
  this.noChannels = channels;
}


}
