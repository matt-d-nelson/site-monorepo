import { RadioOptions } from '@angular-monorepo/shared-models'
import { CommonModule } from '@angular/common'
import { Component, input, OnInit } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'core-ui-radio-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.scss',
})
export class RadioInputComponent implements OnInit {
  label = input<string>()
  parentForm = input.required<FormGroup>()
  control = input.required<any>()
  options = input.required<RadioOptions[] | undefined>() //Absolutely should be defined, lol
  uniqueId!: string

  ngOnInit(): void {
    this.uniqueId = this.getUniqueId()
    console.log(this.uniqueId)
  }

  getUniqueId(): string {
    return Math.random().toString(36).substr(2, 9)
  }
}
