import {Component, model, ChangeDetectionStrategy, input, Input, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges}  from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ChannelComponent} from '../../components/channel/channel.component';
import {MatListModule} from "@angular/material/list";
import {PowerController} from '../../models/powercontroller';
@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatListModule,
    ChannelComponent,
  ],
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Controller implements OnInit, OnChanges {
  controller = model<PowerController>();
  channels = this.controller()?.channels;

  constructor(private cdr: ChangeDetectorRef) {
    console.log('Controller component initializing.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['controller']) {
      this.channels = this.controller()?.channels;
      this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {
    if (this.controller) {
      console.log('Controller initializing: ' + this.controller?.name);
    } else {
      console.log('Controller component OnInit - No controller data provided.');
    }
  }

  toggleAllOn() {
    console.log('Toggling all channels on:' + this.channels); ;
    if (this.channels != null) {
      for (let index = 0; index < this.channels?.length; index++) {
        this.channels[index] = {
          number: this.channels[index].number,
          name: this.channels[index].name,
          state: true,
        };
      }
      console.log('All channels toggled on.');
    }
    this.cdr.detectChanges();
  }

  toggleAllOff() {
    console.log('Toggling all channels off: ' + this.channels); ;
    if (this.channels != null) {
      for (let index = 0; index < this.channels?.length; index++) {
        this.channels[index] = {
          number: this.channels[index].number,
          name: this.channels[index].name,
          state: false,
        };
      }
      console.log('All channels toggled off.');
    }
    this.cdr.detectChanges();
  }
}

