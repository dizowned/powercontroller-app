import { Component, model, ChangeDetectionStrategy } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelComponent {

  channelNo = model<number>();
  channelName = model<string>();
  channelEnabled = model<boolean>();
  buttonColor = model<string>();

  constructor() {}

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
    this.buttonColor.set('green');
  }

  turnOff() {
    this.channelEnabled.set(false);
    this.buttonColor.set('red');
  }

}
