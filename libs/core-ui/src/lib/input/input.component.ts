import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'core-ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  viewProviders: [ {provide: ControlContainer, useExisting: NgForm}],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() label: string = ''
  @Input() parentForm!: FormGroup
  @Input() control!: any //Should really be FormControl, but too much TS boilerplate
  @Input() type: string = 'text'
}
