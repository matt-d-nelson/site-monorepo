import { FORM_DIALOG_INPUT_TYPES } from '@angular-monorepo/shared-models'
import { FormControl, FormGroup, Validators } from '@angular/forms'

export interface Video {
  id: number
  org: number
  name: string
  description: string
  link: string
}

const videoFormConfig = [
  {
    label: 'Name',
    control: 'name',
    type: FORM_DIALOG_INPUT_TYPES.TEXT,
  },
  {
    label: 'Description',
    control: 'description',
    type: FORM_DIALOG_INPUT_TYPES.TEXTAREA,
  },
  {
    label: 'Video URL',
    control: 'link',
    type: FORM_DIALOG_INPUT_TYPES.TEXT,
  },
]

export function CreateVideoDialogConfig(component: any) {
  return {
    header: 'Add Video',
    confirmConfig: {
      label: 'Create',
      confirmMethod: () => component.createVideo(),
    },
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
    }),
    formConfig: videoFormConfig,
  }
}

export function UpdateVideoDialogConfig(component: any) {
  return {
    header: 'Edit Video',
    confirmConfig: {
      label: 'Update',
      confirmMethod: () => component.updateVideo(),
    },
    form: new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
    }),
    formConfig: videoFormConfig,
  }
}
