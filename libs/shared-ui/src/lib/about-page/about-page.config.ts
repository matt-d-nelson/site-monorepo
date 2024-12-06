import { FORM_DIALOG_INPUT_TYPES, FormDialogConfig } from '@angular-monorepo/shared-models'
import { FormControl, FormGroup, Validators } from '@angular/forms'

const aboutFormConfig = [
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
      label: 'Bio',
      control: 'biography',
      type: FORM_DIALOG_INPUT_TYPES.TEXTAREA,
    },
    {
      label: 'Is Primary Bio',
      control: 'isPrimary',
      type: FORM_DIALOG_INPUT_TYPES.RADIO,
      options: [
        {
          label: 'Yes',
          value: true,
        },
        {
          label: 'No',
          value: false,
        },
      ],
    },
  ]

export function CreateAboutDialogConfig(component: any): FormDialogConfig {
  return {
    header: 'Add Biography',
    confirmConfig: {
      label: 'Create',
      confirmMethod: () => component.createBio(),
    },
    form: new FormGroup({
      image: new FormControl<Blob | null>(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      biography: new FormControl('', [Validators.required]),
      isPrimary: new FormControl(false, [Validators.required]),
    }),
    formConfig: aboutFormConfig
  }
}

export function UpdateAboutDialogConfig(component: any) {
  return {
    header: 'Edit Biography',
    confirmConfig: {
      label: 'Update',
      confirmMethod: () => component.updateBio(),
    },
    form: new FormGroup({
      image: new FormControl<Blob | null>(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      biography: new FormControl('', [Validators.required]),
      isPrimary: new FormControl(false, [Validators.required]),
      id: new FormControl('', [Validators.required]),
      imageId: new FormControl('', [Validators.required])
    }),
    formConfig: aboutFormConfig
  }
}
