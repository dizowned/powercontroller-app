import { Component, model } from '@angular/core';
import { Controller } from '../../components/controller/controller.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-main-page',
  imports: [Controller],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})
export class MainPage {
  controllers = model <Controller[]> ([]);

  constructor(){
   for (let i = 0; i < 3; i++) {
     this.controllers.update((list) => {
       list.push(new Controller());
       return list;
     });
   }
  }


}
