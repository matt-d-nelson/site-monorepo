import { ButtonComponent, LazyImgComponent } from '@angular-monorepo/core-ui'
import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import { FormDialogConfig, ToastMessage } from '@angular-monorepo/shared-models'
import {
  AuthService,
  CodeService,
  ConfirmationDialogService,
  OrgService,
  ToastService,
} from '@angular-monorepo/shared-services'
import {
  FormDialogComponent,
  PageWrapperComponent,
} from '@angular-monorepo/shared-ui'
import { CommonModule } from '@angular/common'
import { Component, OnInit, signal } from '@angular/core'
import { NgScrollbarModule } from 'ngx-scrollbar'
import {
  CreateCodeDialogConfig,
  UpdateCodeDialogConfig,
} from './code-page.config'
import { finalize } from 'rxjs'

@Component({
  selector: 'shared-pages-code-page',
  standalone: true,
  imports: [
    CommonModule,
    FormDialogComponent,
    ButtonComponent,
    LazyImgComponent,
    NgScrollbarModule,
    PageWrapperComponent,
  ],
  templateUrl: './code-page.component.html',
  styleUrl: './code-page.component.scss',
})
export class CodePageComponent implements OnInit {
  constructor(
    private codeService: CodeService,
    private orgService: OrgService,
    private confirmationDialogService: ConfirmationDialogService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  BUTTON_TYPES = signal(BUTTON_TYPES)
  CORE_COLORS = signal(CORE_COLORS)
  orgId = signal<string>('')
  userIsAdmin = signal<boolean>(false)

  formDialogOpen = signal<boolean>(false)
  dialogLoading = signal<boolean>(false)
  createProjectConfig = signal<FormDialogConfig>(CreateCodeDialogConfig(this))
  updateProjectConfig = signal<FormDialogConfig>(UpdateCodeDialogConfig(this))
  previousProjectValue = signal<any>(null)
  activeDialogConfig = signal<FormDialogConfig>(this.createProjectConfig())

  projects = signal<any[]>([])

  ngOnInit(): void {
    this.orgService.currentOrgId$.subscribe(orgId => {
      this.orgId.set(orgId)
      this.userIsAdmin.set(this.authService.isUserAdmin(orgId))
    })
  }

  getCodeProjects(orgId: string) {
    this.codeService.getProjects(orgId)
    this.codeService.projects$.subscribe(projects => {
      this.projects.set(projects)
    })
  }

  addCodeClick() {
    this.activeDialogConfig.set(this.createProjectConfig())
    this.formDialogOpen.set(true)
  }

  editBioClick(project: any | null) {
    if (!project) return
    this.activeDialogConfig.set(this.updateProjectConfig())
    const previousProject = {
      ...project,
      image: project.imageUrl,
    }
    this.activeDialogConfig().form.patchValue(previousProject)
    this.previousProjectValue.set(previousProject)
    this.formDialogOpen.set(true)
  }

  createProject() {
    const projForm = this.createProjectConfig().form
    if (!projForm.valid) {
      projForm.markAllAsTouched()
      return
    }

    const projData = projForm.value
    const data = new FormData()
    data.append('name', projData.name)
    data.append('date', projData.date)
    data.append('description', projData.description)
    data.append('repo', projData.repo)
    data.append('link', projData.link)
    data.append('image', projData.image)

    const successMsg: ToastMessage = {
      type: 'success',
      message: `${projData.name} was created`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error creating bio`,
    }

    this.dialogLoading.set(true)
    this.codeService
      .createProject(this.orgId(), data)
      .pipe(finalize(() => this.dialogLoading.set(false)))
      .subscribe({
        next: () => {
          this.toastService.showToast(successMsg)
          this.codeService.getProjects(this.orgId())
          this.formDialogOpen.set(false)
        },
        error: () => {
          this.toastService.showToast(errorMsg)
        },
      })
  }

  updateProject() {
    console.log('sup bitch')
  }
}
