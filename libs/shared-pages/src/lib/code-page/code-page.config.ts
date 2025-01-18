import {
  FORM_DIALOG_INPUT_TYPES,
  FormDialogConfig,
} from '@angular-monorepo/shared-models'
import { FormControl, FormGroup, Validators } from '@angular/forms'

const codeFormConfig = [
  {
    label: 'Image',
    control: 'image',
    type: FORM_DIALOG_INPUT_TYPES.IMAGE,
  },
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
    label: 'Description',
    control: 'description',
    type: FORM_DIALOG_INPUT_TYPES.TEXTAREA,
  },
  {
    label: 'Repo',
    control: 'repo',
    type: FORM_DIALOG_INPUT_TYPES.TEXT,
  },
  {
    label: 'Link',
    control: 'link',
    type: FORM_DIALOG_INPUT_TYPES.TEXT,
  },
]

export function CreateCodeDialogConfig(component: any): FormDialogConfig {
  return {
    header: 'Add Project',
    confirmConfig: {
      label: 'Create',
      confirmMethod: () => component.createProject(),
    },
    form: new FormGroup({
      image: new FormControl<Blob | null>(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      repo: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
    }),
    formConfig: codeFormConfig,
  }
}

export function UpdateCodeDialogConfig(component: any): FormDialogConfig {
  return {
    header: 'Edit Project',
    confirmConfig: {
      label: 'Update',
      confirmMethod: () => component.updateProject(),
    },
    form: new FormGroup({
      image: new FormControl<Blob | null>(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      repo: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      imageId: new FormControl('', [Validators.required]),
    }),
    formConfig: codeFormConfig,
  }
}
