import { Component, Input } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardTitle,
  MatCardActions,
  MatCardHeader,
} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { PowerControllerService } from '../../services/powercontroller-service';
import { PowerController } from '../../models/powercontroller';

@Component({
  selector: 'app-config-page',
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatCardActions,
    FormsModule,
    MatInput,
    MatCardHeader,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './config-page.html',
  styleUrl: './config-page.css',
})
export class ConfigPage {
  controllerGroup = new FormGroup({
    controller_name: new FormControl(''),
    controller_url: new FormControl(''),
  });
  controller$: PowerController | undefined;

  constructor(private powerControllerService: PowerControllerService) {}
  onSubmit() {
    if (
      !this.controllerGroup.get('controller_name')?.value ||
      !this.controllerGroup.get('controller_url')?.value
    ) {
      console.log('Form Incomplete');
    } else {
      console.log('Form Submitted');
      if (this.validateUrl()) {
        this.saveConfig();
        this.clear();
      } else {
        console.log('Invalid URL');
      }
    }
  }

  clear() {
    console.log('Clearing Form');
    this.controllerGroup.get('controller_name')?.setValue('');
    this.controllerGroup.get('controller_url')?.setValue('');
  }

  validateUrl() {
    if (!this.controllerGroup.get('controller_url')?.value) {
      return false;
    }
    return true;
  }

  saveConfig() {
    console.log(
      'Saving: ' +
        this.controllerGroup.get('controller_name')?.value +
        ',' +
        this.controllerGroup.get('controller_url')?.value
    );
   console.log('Generating random ID for controller');
   const randomId = Math.floor(Math.random() * 1000000);
    this.controller$ = {
      id: randomId,
      name: this.controllerGroup.get('controller_name')?.value || '',
      url: this.controllerGroup.get('controller_url')?.value || '',
      channels: [],
    };
    this.powerControllerService.addNewController(this.controller$);
  }

  resetConfig() {
    throw new Error('Method not implemented.');
  }
}
