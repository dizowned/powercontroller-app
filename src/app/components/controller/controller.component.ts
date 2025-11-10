import {Component, model, ChangeDetectionStrategy, input}  from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {ChannelComponent} from '../../components/channel/channel.component';
import {MatListModule } from "@angular/material/list";
import {PowerControllerService } from '../../services/powercontroller-service';
import { HttpClient } from '@angular/common/http';
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
 controller_url: string = ('');
 controllerName: string = 'Default Power Controller';
 noChannels: number = 10;
 channelList = model <ChannelComponent[]> ([]);
 client!: HttpClient;
 controller_info: any;
 private powerControllerService!: PowerControllerService;

  constructor(){
    if (this.controller_url !== undefined && this.controller_url !== '') {
    console.log("Fetching controller info from: " + this.controller_url);
    this.client = new HttpClient(null as any);
    this.powerControllerService = new PowerControllerService(this.client);
    this.controller_info = this.powerControllerService.getControllerInfo(this.controller_url)
      .subscribe((data: { controllerName: string; noChannels: number; channelList: ChannelComponent[]}) => {
        this.controllerName = data.controllerName;
        this.noChannels = data.noChannels;
        this.channelList.set(data.channelList);
      });
    console.log("PowerController: " + this.controllerName + " initialized...")

    } else {
      console.log("No controller URL provided, using default values.");
      this.initializeChannels();
    }
  }

  initializeChannels(){
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

