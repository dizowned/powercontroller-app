import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle, MatCardActions, MatCardHeader } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NewControllerService } from '../../services/newcontroller-service';
import { Controller } from '../../models/controller';

@Component({
  selector: 'app-config-page',
  imports: [MatCard, MatCardContent, MatCardTitle, MatFormField, MatLabel, MatCardActions, FormsModule, MatInput, MatCardHeader],
  templateUrl: './config-page.html',
  styleUrl: './config-page.css'
})
export class ConfigPage {
  @Input() controller_name!: string;
  @Input() controller_url!: string;

constructor(private NewControllerService: NewControllerService) {}
save() {
  console.log("Saving: " + this.controller_name + "," + this.controller_url)
  this.NewControllerService.addNewController({name: this.controller_name, url: this.controller_url})
  this.clear()

}

clear(){
  console.log("Clearing Form")
  this.controller_name = "";
  this.controller_url = "";
}

saveConfig() {
throw new Error('Method not implemented.');
}

resetConfig() {
throw new Error('Method not implemented.');
}

config: any;

}
