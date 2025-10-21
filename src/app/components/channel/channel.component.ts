import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  standalone: true,
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

  constructor(){

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

  toggleChannel(){
    this.channelEnabled = !this.channelEnabled;
    if(this.channelEnabled){
      this.buttonColor = 'green';
    } else{
      this.buttonColor = 'red';
    }
  }
}
