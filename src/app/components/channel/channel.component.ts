import { Component, model, ChangeDetectionStrategy, ChangeDetectorRef, Input, input } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent {

  channelNo = model<number>();
  channelName = model<string>();
  channelEnabled = model<boolean>();
  buttonColor = input<string>();

  constructor() {
    console.log("Channel initialized: " + this.channelName() + " (No. " + this.channelNo() + ") with state: " + (this.channelEnabled() ? 'enabled' : 'disabled'));
  }

  toggleChannel() {
    if (this.channelEnabled()) {
      this.turnOff();
    } else {
      this.turnOn();
    }
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
