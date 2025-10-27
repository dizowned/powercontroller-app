import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from "@angular/material/expansion";
import { MatNavList } from "@angular/material/list";

@Component({
  selector: 'app-side-nav',
  imports: [RouterModule, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatNavList],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css'
})
export class SideNav {

}
