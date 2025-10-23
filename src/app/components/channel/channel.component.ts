import { Component, Inject, Output, EventEmitter, model, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
 @ViewChild('channelButton') channelButton!: ElementRef<HTMLButtonElement>;
 constructor(private cdRef: ChangeDetectorRef) {}


  toggleChannel(){
    this.channelEnabled.update((enabled) => !enabled);
    if(this.channelEnabled()){
      this.buttonColor = 'green';
    } else{
      this.buttonColor = 'red';
    }
    console.log("Channel " + this.channelNo + " toggled to " + (this.channelEnabled() ? "enabled" : "disabled"));
  }

  turnOff(){
    console.log("Turning off: " + this.channelName());
    if(this.channelEnabled() === true){
      this.channelButton.nativeElement.click();
    }
    this.channelEnabled.update((enabled) => false);
    this.cdRef.detectChanges();
  }

  turnOn(){
    console.log("Turning on: " + this.channelName());
    if(this.channelEnabled() === false){
      this.channelButton.nativeElement.click();
    }
    this.channelEnabled.update((enabled) => true);
    this.cdRef.detectChanges();
  }

}
