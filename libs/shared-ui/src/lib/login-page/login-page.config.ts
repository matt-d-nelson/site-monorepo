import { FORM_DIALOG_INPUT_TYPES, FormDialogConfig } from '@angular-monorepo/shared-models'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'

export function CreateLoginDialogConfig(component: any): FormDialogConfig {
  return {
    header: 'Login',
    confirmConfig: {
      label: 'Login',
      confirmMethod: () => component.handleLogin(),
    },
    form: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }),
    formConfig: [
      {
        label: 'Email',
        control: 'email',
        type: FORM_DIALOG_INPUT_TYPES.TEXT,
      },
      {
        label: 'Password',
        control: 'password',
        type: FORM_DIALOG_INPUT_TYPES.PASSWORD,
      },
    ],
  }
}

export function CreateRegisterDialogConfig(component: any): FormDialogConfig {
  return {
    header: 'Register Account',
    confirmConfig: {
      label: 'Register',
      confirmMethod: () => component.handleRegister(),
    },
    form: new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: passwordMatchValidator }
    ),
    formConfig: [
      {
        label: 'Email',
        control: 'email',
        type: FORM_DIALOG_INPUT_TYPES.TEXT,
      },
      {
        label: 'Password',
        control: 'password',
        type: FORM_DIALOG_INPUT_TYPES.PASSWORD,
      },
      {
        label: 'Confirm Password',
        control: 'confirmPassword',
        type: FORM_DIALOG_INPUT_TYPES.PASSWORD,
      },
    ],
  }
}

const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')
  const confirmPassword = control.get('confirmPassword')

  return password?.value !== confirmPassword?.value
    ? { passwordMismatch: true }
    : null
}
