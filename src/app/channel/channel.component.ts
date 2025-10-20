import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent {
 @Input() selectedChannel!: number;
 @Input() selectedChannelName!: string ;
 @Input() selectedChannelStatus!: boolean;
 channelEnabled: boolean = true;
 channel_index: number = 0;
 buttonColor: string = 'green';

  ChannelComponent(){

  }

  get Status(){
    return this.selectedChannelStatus;
  }

  get channelName(){
    return this.selectedChannelName;
  }

  get channelNo(){
    return this.selectedChannel;
  }

  turnOff(){
    this.channelEnabled = false;
    this.buttonColor ='red';
    console.log("Turning off: " + this.selectedChannelName)
  }

  turnOn(){
    this.channelEnabled = true;
    this.buttonColor='green';
    console.log("Turning on: " + this.selectedChannelName)
  }

  togglePower(){
      if (this.channelEnabled == true)
        this.turnOff()
      else
        this.turnOn();
  }
}
