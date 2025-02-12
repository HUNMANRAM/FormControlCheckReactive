import { Component } from '@angular/core';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormComponent], // Import the standalone component
  template: `<app-reactive-form></app-reactive-form>`
})
export class AppComponent {}