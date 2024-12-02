import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import {
  ControlContainer,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms'

@Component({
  selector: 'core-ui-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  label = input.required<string>()
  parentForm = input.required<FormGroup>()
  control = input.required<any>() //Should really be FormControl, but too much TS boilerplate
  type = input.required<string>()
}
