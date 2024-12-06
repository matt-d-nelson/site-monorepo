import { FormGroup } from "@angular/forms"

export interface ConfirmDialogConfig {
    title: string
    message: string
    cancelText?: string
    confirmText?: string
}

export enum FORM_DIALOG_INPUT_TYPES {
    IMAGE,
    TEXT,
    TEXTAREA,
    RADIO,
    PASSWORD
}

export interface RadioOptions {
    label: string
    value: boolean | string
}

export interface FormControlConfig {
    label: string
    control: string
    type: FORM_DIALOG_INPUT_TYPES | string
    options?: RadioOptions[]
}

export interface FormDialogConfig {
    header: string
    confirmConfig: {
        label: string
        confirmMethod: () => void
    }
    form: FormGroup<any>
    formConfig: FormControlConfig[]
}