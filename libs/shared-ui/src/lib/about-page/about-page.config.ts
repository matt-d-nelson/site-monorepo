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
      primary: new FormControl(false),
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
        control: 'primary',
        type: 'radio',
        config: [
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
