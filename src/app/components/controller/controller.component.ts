import {Component, input}  from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ChannelComponent} from '../channel/channel.component';
import {MatListModule } from "@angular/material/list";

@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ChannelComponent, MatListModule],
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class Controller {
 noChannels = input(10);
 controllerName = input('Power Controller');
 selectedChannel = input(1);
 channelList = input([
    { name: 'Channel 1', status: true },
    { name: 'Channel 2', status: true }]);
 channels: ChannelComponent[] = [];

  constructor(){
    const count = this.noChannels();
    for (let i = 0; i < count; i++) {
      this.channels.push(new ChannelComponent());
        }
  }

  turnOff(){
    console.log("Turning off: " + this.selectedChannel)
    this.channels[this.selectedChannel()].channelEnabled = false;
  }

  turnOn(){
    console.log("Turning on: " + this.selectedChannel)
    this.channels[this.selectedChannel()].channelEnabled = true;
  }

  togglePower(){
      const channel = this.selectedChannel()
      if (this.channels[channel].Status)
        this.turnOff()
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
