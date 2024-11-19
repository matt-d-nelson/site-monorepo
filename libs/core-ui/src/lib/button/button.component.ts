import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'core-ui-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() color: 'primary' | 'secondary' | 'success' = 'primary'
  @Input() label: string = ''
  @Output() onClick = new EventEmitter<Event>()
}
