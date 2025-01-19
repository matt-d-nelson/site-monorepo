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
import { GetObjectDifference } from '@angular-monorepo/shared-utilities'
import { isEmpty } from 'lodash-es'

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
      this.getCodeProjects(orgId)
    })
  }

  getCodeProjects(orgId: string) {
    this.codeService.getProjects(orgId)
    this.codeService.projects$.subscribe(projects => {
      this.projects.set(projects)
      console.log(projects)
    })
  }

  addProjectClick() {
    this.activeDialogConfig.set(this.createProjectConfig())
    this.formDialogOpen.set(true)
  }

  deleteProjectClick(project: any | null) {
    if (!project) return
    const successMsg: ToastMessage = {
      type: 'success',
      message: `${project.name} was deleted`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error deleting bio`,
    }

    this.confirmationDialogService
      .openDialog({
        title: 'Delete Bio',
        message: `Are you sure you want to delete ${project.name}?`,
        confirmText: 'Delete',
      })
      .subscribe((confirmed: boolean) => {
        if (!confirmed) return
        this.codeService
          .deleteProject(this.orgId(), project.id, project.imageId)
          .subscribe({
            next: () => {
              this.toastService.showToast(successMsg)
              this.codeService.getProjects(this.orgId())
            },
            error: () => {
              this.toastService.showToast(errorMsg)
            },
          })
      })
  }

  editProjectClick(project: any | null) {
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
    data.append('image', projData.image, projData.image.name)

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
    const projectUpdateForm = this.updateProjectConfig().form
    if (!projectUpdateForm.valid) {
      projectUpdateForm.markAllAsTouched()
      return
    }

    const newProjValues = projectUpdateForm.value
    const projDif = GetObjectDifference(
      this.previousProjectValue(),
      newProjValues
    )
    if (isEmpty(projDif)) {
      this.toastService.showToast({
        type: 'error',
        message: 'No updates detected',
      })
      return
    }

    const data = new FormData()
    projDif.name && data.append('name', projDif.name)
    projDif.date && data.append('date', projDif.date)
    projDif.description && data.append('description', projDif.description)
    projDif.repo && data.append('repo', projDif.repo)
    projDif.link && data.append('link', projDif.link)

    if (projDif.image) {
      data.append('imageId', newProjValues.imageId)
      data.append('image', projDif.image, projDif.image.name)
    }

    const successMsg: ToastMessage = {
      type: 'success',
      message: `${newProjValues.name} was updated`,
    }
    const errorMsg: ToastMessage = {
      type: 'error',
      message: `Error updating project`,
    }
    this.dialogLoading.set(true)
    this.codeService
      .updateProject(this.orgId(), newProjValues.id, data)
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

  navigateExternal(link: string) {
    window.open(link, '_blank')
  }
}
