import {Component, model, ChangeDetectionStrategy, input, Input}  from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ChannelComponent} from '../../components/channel/channel.component';
import {MatListModule} from "@angular/material/list";
import {HttpClient} from '@angular/common/http';
import {PowerController} from '../../models/powercontroller';
@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatListModule,
    ChannelComponent
    ],
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Controller {
@Input() controller?: PowerController
 controller_url: string = ('');
 controllerName: string = 'Default Power Controller';
 noChannels: number = 10;
 channelList = model <ChannelComponent[]> ([]);
 client!: HttpClient;



  constructor(){
    console.log("Controller component initializing.");
    if (this.controller != null){
      this.controller_url = this.controller.url;
      this.controllerName = this.controller.name;
      if (this.controller.channels != null)
        this.noChannels = this.controller.channels.length;
      else
        this.initializeDefaultChannels();
      console.log("Controller initialized: " + this.controllerName + " with " + this.noChannels + " channels.");
    } else {
      console.log("No controller URL provided, using default values.");
    }
  }

  initializeDefaultChannels(){
    for (let i = 0; i < this.noChannels; i++) {
      this.channelList.update((list) => {
        console.log("Adding channel: " + (i + 1) + ", for controller: " + this.controllerName  );
        list.push(new ChannelComponent());
        list[i].channelNo.set(i + 1);
        list[i].channelName.set("Channel " + (i + 1));
        list[i].channelEnabled.set(true);
        list[i].buttonColor.set('green');
        return list;
      })
    }
  }

  toggleAllOn(){
    for (let index = 0; index < this.noChannels; index++) {
      this.channelList.update((list) => {
      list[index].turnOn();
      return list;
    })
    }
    console.log("All channels toggled on.");
  }

 toggleAllOff(){
    for (let index = 0; index < this.noChannels; index++) {
      this.channelList.update((list) => {
      list[index].turnOff();
      return list;
    })
    }
    console.log("All channels toggled off.");
  }
}


