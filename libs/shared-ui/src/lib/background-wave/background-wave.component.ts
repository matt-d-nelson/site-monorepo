import { Component, OnDestroy, OnInit, signal } from '@angular/core'
import { GenerateWavePaths } from './background-wave.utils'
import { OrgService } from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'shared-ui-background-wave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background-wave.component.html',
  styleUrl: './background-wave.component.scss',
})
export class BackgroundWaveComponent implements OnInit, OnDestroy {
  constructor(private orgService: OrgService) {}

  wavePaths = signal<any[]>([])
  backgroundColor = signal<string>('')
  screenWidth = signal<number>(0)
  screenHeight = signal<number>(0)

  private resizeListener = () => {
    this.updateScreenSize()
    this.setWavePaths()
  }

  ngOnInit(): void {
    this.updateScreenSize()
    this.setWavePaths()
    window.addEventListener('resize', this.resizeListener)
  }

  updateScreenSize() {
    this.screenWidth.set(window.innerWidth)
    this.screenHeight.set(window.innerHeight)
  }

  setWavePaths() {
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.backgroundColor.set(
        orgTheme.componentColors.backgroundWave.background
      )
      const waveColors = orgTheme.componentColors.backgroundWave.waveColors
      if (!waveColors) return
      this.wavePaths.set(
        GenerateWavePaths(waveColors, this.screenWidth(), this.screenHeight())
      )
    })
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener)
  }
}
