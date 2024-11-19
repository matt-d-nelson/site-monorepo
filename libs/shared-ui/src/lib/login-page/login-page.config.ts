import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function CreateLoginDialogConfig(component: any) {
    return {
        header: 'Login',
        confirmConfig: {
            label: 'Login',
            confirmMethod: () => component.handleLogin(),
        },
        form: new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        }),
        formConfig: [
            {
                label: 'Email',
                control: 'email',
                type: 'text'
            },
            {
                label: 'Password',
                control: 'password',
                type: 'password'
            }
        ]
    }
}

export function CreateRegisterDialogConfig(component: any) {
    return {
        header: 'Register Account',
        confirmConfig: {
            label: 'Register',
            confirmMethod: () => component.handleRegister(),
        },
        form: new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required])
        }, {validators: passwordMatchValidator}),
        formConfig: [
            {
                label: 'Email',
                control: 'email',
                type: 'text'
            },
            {
                label: 'Password',
                control: 'password',
                type: 'password'
            },
            {
                label: 'Confirm Password',
                control: 'confirmPassword',
                type: 'password'
            }
        ]
    }
}

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')
  
    return password?.value !== confirmPassword?.value 
      ? { passwordMismatch: true } 
      : null;
  };