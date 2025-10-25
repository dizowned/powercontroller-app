import { Component, signal } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent {
  channelNo = signal<number>(1);
  channelName = signal<string>('');
  channelEnabled = signal<boolean>(true);
  buttonColor = signal<string>('green');

  constructor() {}

  public setButtonColor(color: string) {
    this.buttonColor.update((buttonColor) => color);
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

  turnOff() {
    console.log('Turning off: ' + this.channelName() + '; button was: ' + this.buttonColor);
    this.channelEnabled.update((enabled) => false);
    this.setButtonColor('red');
  }

  turnOn() {
    console.log('Turning on: ' + this.channelName() + '; button was: ' + this.buttonColor);
    this.channelEnabled.update((enabled) => true);
    this.setButtonColor('green');
  }
}
