import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PdfDialogComponent } from './pdf-dialog.component'
import { ComponentRef } from '@angular/core'

describe('PdfDialogComponent', () => {
  let component: PdfDialogComponent
  let componentRef: ComponentRef<PdfDialogComponent>
  let fixture: ComponentFixture<PdfDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfDialogComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PdfDialogComponent)
    component = fixture.componentInstance
    componentRef = fixture.componentRef

    const dialogElement = document.createElement('dialog')
    if (!dialogElement.showModal) {
      HTMLDialogElement.prototype.showModal = function () {
        this.setAttribute('open', '')
      }
      HTMLDialogElement.prototype.close = function () {
        this.removeAttribute('open')
      }
    }

    componentRef.setInput('config', {})
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
