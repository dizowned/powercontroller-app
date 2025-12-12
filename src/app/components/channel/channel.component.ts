import { Component, model, input, OnInit } from '@angular/core';
import { PowerControllerService } from '../../services/powercontroller-service';
@Component({
  standalone: true,
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit{

  channelNo = model<number>();
  channelName = model<string>();
  channelEnabled = model<boolean>();
  buttonColor = input<string>();
  controllerId = input<number>();

  constructor(private powerControllerService: PowerControllerService) {
    console.log("Channel initializing");
  }
  ngOnInit(): void {
    console.log("Channel component OnInit - Channel initialized: " + this.channelName() + " (No. " + this.channelNo() + ") with state: " + (this.channelEnabled() ? 'enabled' : 'disabled'));
  }

  toggleChannel() {
    const nextState = !this.channelEnabled();
    // optimistic update
    this.channelEnabled.set(nextState);
    const controllerId = this.controllerId();
    const channelNo = this.channelNo();
    if (controllerId == null || channelNo == null) {
      console.warn('ControllerId or channelNo missing; reverting state');
      this.channelEnabled.set(!nextState);
      return;
    }
    this.powerControllerService.setChannelState(controllerId, channelNo, nextState).subscribe(resp => {
      if (!resp.success) {
        console.warn('Server failed to set state; reverting');
        this.channelEnabled.set(!nextState);
      } else {
        this.channelEnabled.set(resp.state);
      }
    });
    console.log(
      this.channelName() +
      ' toggled to: ' +
      (nextState ? 'enabled' : 'disabled')
    );
  }

  turnOn() {
    this.channelEnabled.set(true);
  }

  turnOff() {
    this.channelEnabled.set(false);
  }

}
