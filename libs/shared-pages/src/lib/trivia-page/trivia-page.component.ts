import {
  ButtonComponent,
  ImgInputComponent,
  InputComponent,
  RadioInputComponent,
} from '@angular-monorepo/core-ui'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import { ToastMessage } from '@angular-monorepo/shared-models'
import {
  AuthService,
  OrgService,
  ToastService,
  TriviaService,
} from '@angular-monorepo/shared-services'
import { PageWrapperComponent } from '@angular-monorepo/shared-ui'
import { CommonModule } from '@angular/common'
import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core'
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { NgScrollbar } from 'ngx-scrollbar'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'page-trivia-page',
  standalone: true,
  imports: [
    CommonModule,
    PageWrapperComponent,
    NgScrollbar,
    ButtonComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    ImgInputComponent,
    RadioInputComponent,
  ],
  templateUrl: './trivia-page.component.html',
  styleUrl: './trivia-page.component.scss',
})
export class TriviaPageComponent implements OnInit {
  constructor(
    private orgService: OrgService,
    private authService: AuthService,
    private spinnerService: NgxSpinnerService,
    private triviaService: TriviaService,
    private toastService: ToastService
  ) {}

  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)

  orgId = signal<string>('')
  userIsAdmin = signal<boolean>(false)

  draftTriviaId = signal<string | null>(null)
  draftTriviaQuestions = signal<any[]>([])

  // form management
  @ViewChild('triviaFormDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>
  dialogLoading = signal<boolean>(false)

  optionsOption = [
    {
      label: 'Correct',
      value: true,
    },
    {
      label: 'Wrong',
      value: false,
    },
  ]
  generateOptionForm = () =>
    new FormGroup({
      text: new FormControl('', [Validators.required]),
      isCorrect: new FormControl(false, [Validators.required]),
    })

  generateQuestionForm = () =>
    new FormGroup({
      questionNumber: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      options: new FormArray([
        this.generateOptionForm(),
        this.generateOptionForm(),
        this.generateOptionForm(),
        this.generateOptionForm(),
      ]),
    })
  questionForm = this.generateQuestionForm()
  triviaParentForm = new FormGroup({
    coverImage: new FormControl<File | null>(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    eventDate: new FormControl('', [Validators.required]),
    isActive: new FormControl(false, [Validators.required]),
  })

  ngOnInit(): void {
    this.orgService.currentOrgId$.subscribe(orgId => {
      this.orgId.set(orgId)
      this.userIsAdmin.set(this.authService.isUserAdmin(orgId))
      // get trivia games
      // find active trivia game
    })
  }

  initTriviaDraft() {
    //TODO: check if any drafts exist

    this.triviaService.createTriviaDraft(this.orgId()).subscribe({
      next: (triviaDraft: any) => {
        this.draftTriviaId.set(triviaDraft.id)
        this.openTriviaFormDialog()
      },
      error: () => {
        this.toastService.showToast({
          type: 'error',
          message: 'Whoops, try again',
        })
      },
    })
  }

  // -------------------- Questions -------------------- //
  getOptionsControls() {
    return (this.questionForm.get('options') as FormArray).controls
  }

  getOptionForm(index: number) {
    return (this.questionForm.get('options') as FormArray).at(
      index
    ) as FormGroup
  }

  refreshDraftTriviaQuestions(draftId: string) {
    this.dialogLoading.set(true)
    this.triviaService.getTriviaQuestions(draftId).subscribe({
      next: (res: any) => {
        this.dialogLoading.set(false)
        this.draftTriviaQuestions.set(res)
      },
    })
  }

  createQuestion() {
    const successMsg: ToastMessage = {
      type: 'success',
      message: `Question Created`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error creating question`,
    }

    const draftId = this.draftTriviaId()
    if (!draftId) {
      this.toastService.showToast(errorMsg)
      return
    }
    if (!this.questionForm.valid) {
      this.questionForm.markAllAsTouched()
      return
    }

    const questionValues = this.questionForm.value
    const data = new FormData()
    questionValues.question && data.append('question', questionValues.question)
    questionValues.questionNumber &&
      data.append('questionNumber', questionValues.questionNumber)

    this.dialogLoading.set(true)
    // TODO: change this to form data after be is done
    this.triviaService
      .createTriviaQuestion(this.orgId(), draftId, questionValues)
      .subscribe({
        next: () => {
          this.dialogLoading.set(false)
          this.questionForm = this.generateQuestionForm()
          this.refreshDraftTriviaQuestions(draftId)
        },
      })
  }

  openTriviaFormDialog() {
    this.dialog.nativeElement.showModal()
  }

  deleteQuestion(question: any) {
    console.log(question)
  }

  cancelTriviaGame() {}

  publishTriviaGame() {}
}
