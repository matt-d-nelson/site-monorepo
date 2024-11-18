import { ButtonComponent, InputComponent } from '@angular-monorepo/core-ui';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'shared-ui-form-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss'
})
export class FormDialogComponent implements OnChanges, OnInit {
  @ViewChild('formDialog', {static:true}) dialog!: ElementRef<HTMLDialogElement>
  @Input() open: boolean = false
  @Output() openChange = new EventEmitter<boolean>()

  @Input() dialogConfig!: any //TODO: type

  ngOnInit(): void {
      console.log( this.dialogConfig)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['open']) this.updateDialogState()
  }

  openModal() {
    this.dialog.nativeElement.showModal()
  }

  closeModal() {
    this.dialog.nativeElement.close()
    this.open = false
    this.openChange.emit(false)
  }

  updateDialogState() {
    this.open ? this.openModal() : this.closeModal()
  }

  handleConfirm() {
    this.dialogConfig.confirmConfig.confirmMethod()
  }
}
