import {
  ButtonComponent,
  ImgInputComponent,
  InputComponent,
  LazyImgComponent,
  RadioInputComponent,
} from '@angular-monorepo/core-ui'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import { ToastMessage } from '@angular-monorepo/shared-models'
import {
  AuthService,
  ConfirmationDialogService,
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
import { Router, RouterModule } from '@angular/router'
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
    RouterModule,
    LazyImgComponent,
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
    private toastService: ToastService,
    private confirmationDialogService: ConfirmationDialogService,
    public router: Router
  ) {}

  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)

  orgId = signal<string>('')
  userIsAdmin = signal<boolean>(false)
  bannerImg = signal('')

  draftTriviaId = signal<string | null>(null)
  draftTriviaQuestions = signal<any[]>([])

  // todo: type
  activeTrivia = signal<any>(null)
  inactiveTrivia = signal<any[]>([])

  // form management - active trivia

  activeTriviaForm: FormGroup = new FormGroup({})
  activeTriviaFormConfig = signal<any>({})

  // form management - create dialog
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
    name: new FormControl('', [Validators.required]),
    eventDate: new FormControl('', [Validators.required]),
    isActive: new FormControl(false, [Validators.required]),
  })

  ngOnInit(): void {
    this.orgService.currentOrgId$.subscribe(orgId => {
      this.orgId.set(orgId)
      this.userIsAdmin.set(this.authService.isUserAdmin(orgId))
      this.triviaService.getTriviaGames(orgId)
      this.initSortTriviaSub()
    })
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.bannerImg.set(orgTheme.staticResouces.triviaPage)
    })
  }

  initSortTriviaSub() {
    this.triviaService.triviaGames$.subscribe(games => {
      this.inactiveTrivia.set([])
      this.activeTrivia.set(null)
      console.log(games)
      games.forEach((game: any) => {
        if (game?.isActive) {
          this.activeTrivia.set(game)
          this.createActiveTriviaForm(this.activeTrivia())
        } else {
          this.inactiveTrivia().push(game)
        }
      })
    })
  }

  createActiveTriviaForm(game: any) {
    const activeTriviaForm = new FormGroup({})
    activeTriviaForm.addControl(
      'name',
      new FormControl('', Validators.required)
    )

    let activeTriviaFormConfig: any = {}

    game?.questions.forEach((question: any) => {
      activeTriviaForm.addControl(
        `${question.id}`,
        new FormControl(null, Validators.required)
      )
      activeTriviaFormConfig[question.id] = []

      question?.options.forEach((option: any) => {
        activeTriviaFormConfig[question.id].push({
          label: option.text,
          value: option.id,
        })
      })
    })

    this.activeTriviaForm = activeTriviaForm
    this.activeTriviaFormConfig.set(activeTriviaFormConfig)
  }

  submitTriviaAnswers() {
    if (!this.activeTriviaForm.valid) {
      this.activeTriviaForm.markAllAsTouched()
      return
    }

    this.confirmationDialogService
      .openDialog({
        title: 'Submit Answers',
        message: `Are you sure you want to submit your answers?`,
      })
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return

        const answers = this.activeTriviaForm.value
        const triviaScore = this.calculateTriviaScore(answers)

        const successMsg: ToastMessage = {
          type: 'success',
          message: `${answers?.name}'s score was submitted`,
        }
        const errorMsg: ToastMessage = {
          type: 'error',
          message: `Error submitting score`,
        }

        this.spinnerService.show()
        this.triviaService
          .submitTriviaAnswers(this.orgId(), this.activeTrivia()?.id, {
            name: answers?.name,
            score: triviaScore,
          })
          .subscribe({
            next: (res: any) => {
              this.spinnerService.hide()
              this.toastService.showToast(successMsg)
              this.router.navigate(['/trivia/', res.trivia.id])
            },
            error: () => {
              this.spinnerService.hide()
              this.toastService.showToast(errorMsg)
            },
          })
      })
  }

  calculateTriviaScore(answers: any): number {
    let score = 0

    this.activeTrivia().questions.forEach((question: any) => {
      const thisAnswer = answers?.[question.id]
      const opIdx = question?.options.findIndex(
        (op: any) => op.id === thisAnswer
      )
      if (question?.options?.[opIdx]?.isCorrect) {
        score++
      }
    })

    return score
  }

  initTriviaDraft() {
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

  deleteTriviaClick(game: any) {
    const triviaTitle = game?.name || 'unnamed draft'
    const successMsg: ToastMessage = {
      type: 'success',
      message: `${triviaTitle} was deleted`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error deleting trivia game`,
    }

    this.confirmationDialogService
      .openDialog({
        title: 'Delete Trivia Game',
        message: `Are you sure you want to delete ${triviaTitle}?`,
      })
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return
        this.spinnerService.show()
        this.triviaService.deleteTriviaGame(this.orgId(), game.id).subscribe({
          next: () => {
            this.spinnerService.hide()
            this.toastService.showToast(successMsg)
            this.triviaService.getTriviaGames(this.orgId())
          },
          error: () => {
            this.spinnerService.hide()
            this.toastService.showToast(errorMsg)
          },
        })
      })
  }

  activateTriviaClick(game: any, setActive: boolean) {
    const triviaTitle = game?.name || 'unnamed draft'
    const activeText = setActive ? 'activate' : 'deactivate'
    const successMsg: ToastMessage = {
      type: 'success',
      message: `${triviaTitle} has been ${activeText}ed`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error, can not ${activeText} trivia game`,
    }

    this.confirmationDialogService
      .openDialog({
        title: 'Activate/Deactivate Trivia Game',
        message: `Are you sure you want to ${activeText} ${triviaTitle}?`,
      })
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return
        this.triviaService
          .activateTriviaGame(this.orgId(), game.id, setActive)
          .subscribe({
            next: () => {
              this.toastService.showToast(successMsg)
              this.triviaService.getTriviaGames(this.orgId())
            },
            error: () => {
              this.spinnerService.hide()
              this.toastService.showToast(errorMsg)
            },
          })
      })
  }

  closeTriviaFormDialog() {
    this.dialog.nativeElement.close()
    this.triviaParentForm.reset()
    this.questionForm.reset()
    this.draftTriviaId.set(null)
    this.draftTriviaQuestions.set([])
  }

  cancelTriviaGame() {
    const successMsg: ToastMessage = {
      type: 'success',
      message: `Trivia creation canceled`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Whoops, try again`,
    }

    const draftId = this.draftTriviaId()
    if (!draftId) {
      this.toastService.showToast(errorMsg)
      return
    }

    this.confirmationDialogService
      .openDialog({
        title: 'Delete Trivia Game',
        message: `Are you sure you want to cancel? Progress will not be saved`,
      })
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return
        this.dialogLoading.set(true)
        this.triviaService.deleteTriviaGame(this.orgId(), draftId).subscribe({
          next: () => {
            this.dialogLoading.set(false)
            this.closeTriviaFormDialog()
            this.toastService.showToast(successMsg)
          },
          error: () => {
            this.dialogLoading.set(false)
            this.toastService.showToast(errorMsg)
          },
        })
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

    this.dialogLoading.set(true)
    this.triviaService
      .createTriviaQuestion(this.orgId(), draftId, questionValues)
      .subscribe({
        next: res => {
          this.dialogLoading.set(false)
          this.questionForm = this.generateQuestionForm()
          this.draftTriviaQuestions().push(res)
        },
      })
  }

  openTriviaFormDialog() {
    this.dialog.nativeElement.showModal()
  }

  deleteQuestion(questionToDelete: any) {
    const successMsg: ToastMessage = {
      type: 'success',
      message: `Question deleted`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error deleting question`,
    }

    this.dialogLoading.set(true)
    this.triviaService
      .deleteTriviaQuestion(this.orgId(), questionToDelete.id)
      .subscribe({
        next: () => {
          this.dialogLoading.set(false)
          this.toastService.showToast(successMsg)
          this.draftTriviaQuestions.set(
            this.draftTriviaQuestions().filter(
              question => question.id !== questionToDelete.id
            )
          )
        },
        error: () => {
          this.dialogLoading.set(false)
          this.toastService.showToast(errorMsg)
        },
      })
  }

  publishTriviaGame() {
    if (!this.triviaParentForm.valid) {
      this.triviaParentForm.markAllAsTouched()
      return
    }

    this.confirmationDialogService
      .openDialog({
        title: 'Publish Album',
        message: `Are you sure you want to publish this game?`,
      })
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return

        const triviaData = this.triviaParentForm.value
        const drafID = this.draftTriviaId()
        const successMsg: ToastMessage = {
          type: 'success',
          message: `${triviaData.name} was created`,
        }
        const errorMsg: ToastMessage = {
          type: 'error',
          message: `Error creating game`,
        }

        if (!drafID) {
          this.toastService.showToast(errorMsg)
          return
        }
        this.dialogLoading.set(true)

        this.triviaService
          .publishTriviaDraft(this.orgId(), drafID, triviaData)
          .subscribe({
            next: () => {
              this.dialogLoading.set(false)
              this.toastService.showToast(successMsg)
              this.triviaService.getTriviaGames(this.orgId())
              this.closeTriviaFormDialog()
            },
            error: () => {
              this.toastService.showToast(errorMsg)
              this.dialogLoading.set(true)
            },
          })
      })
  }
}
