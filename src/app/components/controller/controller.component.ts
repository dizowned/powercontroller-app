import { NgStyle } from '@angular/common';
import { MatAccordion } from "@angular/material/expansion";
import {ChangeDetectionStrategy, Component, input, viewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ChannelComponent} from '../channel/channel.component';

@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ChannelComponent],
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
      this.channels.push(new ChannelComponent(this.channelList()[i].name));
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

}
