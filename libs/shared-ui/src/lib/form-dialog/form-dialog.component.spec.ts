import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormDialogComponent } from './form-dialog.component'
import { ComponentRef } from '@angular/core'
import { FormDialogConfig } from '@angular-monorepo/shared-models'
import { FormGroup } from '@angular/forms'

describe('FormDialogComponent', () => {
  let component: FormDialogComponent
  let componentRef: ComponentRef<FormDialogComponent>
  let fixture: ComponentFixture<FormDialogComponent>

  const mockDialogConfig: FormDialogConfig = {
    header: 'test',
    confirmConfig: {
      label: 'test',
      confirmMethod: jest.fn(),
    },
    form: new FormGroup({}),
    formConfig: [],
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDialogComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormDialogComponent)
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

    componentRef.setInput('dialogConfig', mockDialogConfig)
    componentRef.setInput('loading', false)

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open and close dialog', () => {
    componentRef.setInput('open', true)
    fixture.detectChanges()

    expect(component.dialog.nativeElement.hasAttribute('open')).toBe(true)

    componentRef.setInput('open', false)
    fixture.detectChanges()

    expect(component.dialog.nativeElement.hasAttribute('open')).toBe(false)
  })

  it('should reset form and emit false when closing', () => {
    const resetSpy = jest.spyOn(mockDialogConfig.form, 'reset')
    const emitSpy = jest.spyOn(component.openChange, 'emit')

    componentRef.setInput('open', true)
    fixture.detectChanges()

    component.closeModal()

    expect(resetSpy).toHaveBeenCalled()
    expect(emitSpy).toHaveBeenCalledWith(false)
  })

  it('should call confirmMethod when handling confirm', () => {
    const confirmSpy = jest.spyOn(
      mockDialogConfig.confirmConfig,
      'confirmMethod'
    )

    component.handleConfirm()

    expect(confirmSpy).toHaveBeenCalled()
  })
})
