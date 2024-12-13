import { FORM_DIALOG_INPUT_TYPES } from '@angular-monorepo/shared-models'
import { FormControl, FormGroup, Validators } from '@angular/forms'

export interface Event {
  id: number
  org: number
  date: string
  name: string
  link: string
}

const eventFormConfig = [
  {
    label: 'Name',
    control: 'name',
    type: FORM_DIALOG_INPUT_TYPES.TEXT,
  },
  {
    label: 'Date',
    control: 'date',
    type: FORM_DIALOG_INPUT_TYPES.DATE,
  },
  {
    label: 'Link',
    control: 'link',
    type: FORM_DIALOG_INPUT_TYPES.TEXT,
  },
]

export function CreateEventDialogConfig(component: any) {
  return {
    header: 'Add Event',
    confirmConfig: {
      label: 'Create',
      confirmMethod: () => component.createEvent(),
    },
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
    }),
    formConfig: eventFormConfig,
  }
}

export function UpdateEventDialogConfig(component: any) {
  return {
    header: 'Update Event',
    confirmConfig: {
      label: 'Update',
      confirmMethod: () => component.updateEvent(),
    },
    form: new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
    }),
    formConfig: eventFormConfig,
  }
}
