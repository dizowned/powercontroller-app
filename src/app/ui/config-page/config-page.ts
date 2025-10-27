import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle, MatCardActions } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-config-page',
  imports: [MatCard, MatCardContent, MatCardTitle, MatFormField, MatLabel, MatCardActions, FormsModule, MatInput],
  templateUrl: './config-page.html',
  styleUrl: './config-page.css'
})
export class ConfigPage {
save() {
throw new Error('Method not implemented.');
}
  @Input() controller_name!: string;
  @Input() controller_url!: string;

saveConfig() {
throw new Error('Method not implemented.');
}
resetConfig() {
throw new Error('Method not implemented.');
}
config: any;

}
