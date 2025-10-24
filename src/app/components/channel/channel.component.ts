import { Component, Inject, Output, EventEmitter, model, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Input } from '@angular/core';
import { channel } from 'diagnostics_channel';

@Component({
  standalone: true,
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
  imports: [NgStyle],
})
export class ChannelComponent {
 channelNo = model<number>(1);
 channelName = model<string>('') ;
 channelEnabled = model<boolean>(true);
 @Output() channelToggle = new EventEmitter<string>();
 buttonColor = model<string>('green');
 @ViewChild('channelButton') channelButton!: ElementRef<HTMLButtonElement>;

 // allow parent binding like: <app-channel [externalButtonColor]="'red'"></app-channel>
 @Input()
 set externalButtonColor(color: string | undefined) {
   if (color !== undefined && color !== null) {
     this.setButtonColor(color);
     this.cdRef.detectChanges();
   }
 }

 // allow parent to update via ViewChild: child.setButtonColor('red')
 public setButtonColor(color: string) {
   this.buttonColor.update ((buttonColor) => {
      buttonColor = color;
    return color;
    });
   this.cdRef.detectChanges();
 }

 constructor(private cdRef: ChangeDetectorRef) {}


  toggleChannel(){
    this.channelEnabled.update((enabled) => !enabled);
    if(this.channelEnabled()){
      this.setButtonColor('green');
    } else{
      this.setButtonColor('red');
    }
    console.log("Channel " + this.channelNo + " toggled to " + (this.channelEnabled() ? "enabled" : "disabled"));
  }

  turnOff(){
    console.log("Turning off: " + this.channelName() + "; button was: " + this.buttonColor );
    this.channelEnabled.update((enabled) => false);
    this.setButtonColor('red');
    this.cdRef.detectChanges();
  }

  turnOn(){
    console.log("Turning on: " + this.channelName() + "; button was: " + this.buttonColor );
    this.channelEnabled.update((enabled) => true);
    this.setButtonColor ('green');
    this.cdRef.detectChanges();
  }

}
