import { CommonModule } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'

@Component({
  selector: 'core-ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() color?: string
  @Input() hoverTextColor?: string
  @Input() label?: string = ''
  @Input() icon?: TemplateRef<SVGElement>
  @Output() onClick = new EventEmitter<Event>()
}
