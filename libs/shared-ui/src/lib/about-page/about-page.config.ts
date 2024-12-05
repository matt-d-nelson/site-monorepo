import { FormControl, FormGroup, Validators } from '@angular/forms'

export function CreateAboutDialogConfig(component: any) {
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
}
