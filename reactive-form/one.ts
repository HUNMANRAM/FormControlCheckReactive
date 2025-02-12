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
  formErrors: { [key: string]: string } = {};

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.form.valueChanges.subscribe(() => this.validateForm()); // Automatically validate on changes
  }

  onButtonClick() {
    this.markFormGroupTouched(this.form); // Mark all controls as touched
    this.form.updateValueAndValidity(); // Ensure validation runs properly
    this.validateForm(); // Validate the form

    if (this.form.valid) {
      console.log('Form is valid!', this.form.value);
    } else {
      console.log('Form is invalid!');
    }
  }

  validateForm() {
    this.formErrors = {}; // Reset errors

    for (const field in this.validationMessages) {
      const control = this.form.get(field);
      if (control && control.invalid && (control.touched || control.dirty)) {
        this.formErrors[field] = Object.keys(control.errors || {})
          .map(errorKey => this.validationMessages[field][errorKey])
          .join(' ');
      }
    }
  }

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
