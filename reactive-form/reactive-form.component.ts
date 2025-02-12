import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VALIDATION_MESSAGES } from '../validation-messages.const';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {
  form!: FormGroup;
  validationMessages = VALIDATION_MESSAGES;
  formErrors: { name?: string; email?: string } = {}; // Now using specific keys only
  showErrors = false; // Controls when errors appear

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onButtonClick() {
    this.showErrors = true; // Enable error display
    this.validateForm(); // Run validation

    if (this.form.valid) {
      console.log('✅ Form is valid!', this.form.value);
    } else {
      console.log('❌ Form is invalid!');
    }
  }

  validateForm() {
    this.formErrors = {}; // Reset errors

    for (const field of Object.keys(this.validationMessages)) {
      const control = this.form.get(field);
      if (control && control.invalid) {
        this.formErrors[field as 'name' | 'email'] = Object.keys(control.errors || {})
          .map(errorKey => this.validationMessages[field as 'name' | 'email'][errorKey])
          .join(' ');
      }
    }
  }
}
