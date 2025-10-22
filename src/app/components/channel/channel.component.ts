import { Component, Inject, Output, EventEmitter, model } from '@angular/core';
import { Input } from '@angular/core';
import { channel } from 'diagnostics_channel';

@Component({
  standalone: true,
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent {
 channelNo = model<number>(1);
 channelName = model<string>('') ;
 channelEnabled = model<boolean>(true);
 @Output() channelToggle = new EventEmitter<string>();
 buttonColor: string = 'green';
 constructor() {}

  toggleChannel(){
    this.channelEnabled.update((enabled) => !enabled);
    if(this.channelEnabled()){
      this.buttonColor = 'green';
    } else{
      this.buttonColor = 'red';
    }
    console.log("Channel " + this.channelNo + " toggled to " + (this.channelEnabled() ? "enabled" : "disabled"));
  }
}
