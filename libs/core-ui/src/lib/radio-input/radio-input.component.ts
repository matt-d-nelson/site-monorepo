import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'core-ui-radio-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.scss',
})
export class RadioInputComponent {
  label = input.required<string>()
  parentForm = input.required<FormGroup>()
  control = input.required<any>()
  options = input.required<any>() //TODO: type
}
