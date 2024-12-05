import { FormControl, FormGroup, Validators } from '@angular/forms'

const baseAboutConfig = {
  form: new FormGroup({
    image: new FormControl<File | null>(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    biography: new FormControl('', [Validators.required]),
    isPrimary: new FormControl(false, [Validators.required]),
  }),
  formConfig: [
    {
      label: 'Image',
      control: 'image',
      type: 'image',
    },
    {
      label: 'Name',
      control: 'name',
      type: 'text',
    },
    {
      label: 'Bio',
      control: 'biography',
      type: 'textarea',
    },
    {
      label: 'Is Primary Bio',
      control: 'isPrimary',
      type: 'radio',
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
  ],
}

export function CreateAboutDialogConfig(component: any) {
  return {
    header: 'Add Biography',
    confirmConfig: {
      label: 'Create',
      confirmMethod: () => component.createBio(),
    },
    ...baseAboutConfig
  }
}

export function UpdateAboutDialogConfig(component: any) {
  return {
    header: 'Edit Biography',
    confirmConfig: {
      label: 'Update',
      confirmMethod: () => component.updateBio(),
    },
    ...baseAboutConfig
  }
}
