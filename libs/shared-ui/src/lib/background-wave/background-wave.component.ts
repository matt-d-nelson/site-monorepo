import { Component, OnInit } from '@angular/core';
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
export class BackgroundWaveComponent implements OnInit {
  constructor(private orgService: OrgService) {}

  wavePaths!: any[]

  ngOnInit(): void {
    this.setWavePaths()
  }

  setWavePaths() {
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      const waveColors = orgTheme.componentColors.waveColors
      if(!waveColors) return
      this.wavePaths = GenerateWavePaths(waveColors)
      console.log(this.wavePaths)
    })
  }
}
