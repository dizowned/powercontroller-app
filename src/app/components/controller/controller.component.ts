import {Component, input, InputSignal}  from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ChannelComponent} from '../../components/channel/channel.component';
import {MatListModule } from "@angular/material/list";
import { PowercontrollerService } from '../../service/powercontroller-service';
@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatListModule],
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class Controller {
 noChannels: number = 10;
 controllerName: string = 'Power Controller';
 selectedChannel: number = 1;
 controller_url: string | null = null;
 channelList = [
    { name: 'Channel 1', status: true },
    { name: 'Channel 2', status: true }];
 channels: ChannelComponent[] = [];

  constructor(private powercontrollerService: PowercontrollerService) {
    if (this.controller_url) {
      this.powercontrollerService.getControllerInfo(this.controller_url)
      .subscribe((data: { controllerName: string; noChannels: number; channelList: ChannelComponent[]}) => {
        this.controllerName = data.controllerName;
        this.noChannels = data.noChannels;
      });
    }
  }

  turnOff(){
    console.log("Turning off: " + this.selectedChannel);
    this.channels[this.selectedChannel].channelEnabled = false;
  }

  turnOn(){
    console.log("Turning on: " + this.selectedChannel);
    this.channels[this.selectedChannel].channelEnabled = true;
  }

  togglePower(){
      const channel = this.selectedChannel;
      if (this.channels[channel].channelEnabled)
        this.turnOff();
      else
        this.turnOn();
  }

  toggleAllOn(){
    for (let i = 0; i < this.channels.length; i++) {
      this.channels[i].channelEnabled = true;
    }
  }

  toggleAllOff(){
    for (let i = 0; i < this.channels.length; i++) {
      this.channels[i].channelEnabled = false;
    }
  }

}
