import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenerateWavePaths } from './background-wave.utils';
import { OrgService } from '@angular-monorepo/shared-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-ui-background-wave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background-wave.component.html',
  styleUrl: './background-wave.component.scss'
})
export class BackgroundWaveComponent implements OnInit, OnDestroy{
  constructor(private orgService: OrgService) {}

  wavePaths!: any[]
  backgroundColor!: string
  screenWidth!: number
  screenHeight!: number

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
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
  }

  setWavePaths() {
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.backgroundColor = orgTheme.componentColors.main.background
      const waveColors = orgTheme.componentColors.waveColors
      if(!waveColors) return
      this.wavePaths = GenerateWavePaths(waveColors, this.screenWidth, this.screenHeight)
    })
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener)
  }
}
