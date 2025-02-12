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
  validationMessages: { [key: string]: { [key: string]: string } } = VALIDATION_MESSAGES;
  formErrors: { [key: string]: string } = {
    name: '',
    email: ''
  };

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
    this.markFormGroupTouched(this.form); // Mark all controls as touched
    this.validateForm(); // Validate the form
    if (this.form.valid) {
      console.log('Form is valid!', this.form.value);
    } else {
      console.log('Form is invalid!');
    }
  }

  validateForm() {
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = ''; // Clear previous error messages
        const control = this.form.get(field);

        if (control && control.invalid && (control.touched || control.dirty)) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  // Helper method to mark all controls in a form group as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control); // Recursively handle nested form groups
      }
    });
  }
}