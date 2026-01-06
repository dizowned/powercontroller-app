import { Component, model, input, OnInit } from '@angular/core';
import { PowerControllerService } from '../../services/powercontroller-service';
@Component({
  standalone: true,
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent{

  channelNo = model.required<number>();
  channelName = model<string>();
  channelEnabled = model.required<boolean>();
  buttonColor = input<string>();
  controllerId  = input.required<number>();

  constructor(private powerControllerService: PowerControllerService ) {
    console.log('Channel component initializing.');
  }


  updateChannel(){
    console.log("Updating channel: " + "Controller ID: "+this.controllerId() + ", Channel No. " + this.channelNo() + ", Channel Name:" + this.channelName() + ", New State: " + this.channelEnabled());
    this.powerControllerService.setChannelState(this.controllerId(), this.channelNo(), this.channelEnabled());

  }

  toggleChannel() {
    console.log("Toggling channel: " + "Controller ID: "+this.controllerId() + ", Channel No. " + this.channelNo() + ", Channel Name:" + this.channelName());
    this.channelEnabled.set(!this.channelEnabled());
    if (this.controllerId() == null || this.channelNo() == null) {
     console.warn('ControllerId or channelNo missing; reverting state ');
      this.channelEnabled.set(!this.channelEnabled());
      return;
    }
    this.updateChannel();
    console.log(
      this.channelName() +
      ' toggled to: ' +
      (this.channelEnabled() ? 'enabled' : 'disabled')
    );
  }

  turnOn() {
    this.channelEnabled.set(true);
  }

  turnOff() {
    this.channelEnabled.set(false);
  }

}
