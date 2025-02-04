import {
  AudioProgressComponent,
  PlayButtonComponent,
} from '@angular-monorepo/core-ui'
import { AudioService, OrgService } from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'
import { Component, signal, OnInit } from '@angular/core'

@Component({
  selector: 'shared-ui-audio-footer',
  standalone: true,
  imports: [CommonModule, PlayButtonComponent, AudioProgressComponent],
  templateUrl: './audio-footer.component.html',
  styleUrl: './audio-footer.component.scss',
})
export class AudioFooterComponent implements OnInit {
  constructor(
    private orgService: OrgService,
    private audioService: AudioService
  ) {}

  footerColor = signal<string>('')
  textColor = signal<string>('')
  homeTrack = signal<any>(null)

  ngOnInit(): void {
    this.orgService.currentOrgTheme$.subscribe((orgTheme: any) => {
      this.footerColor.set(orgTheme.componentColors.footer.color)
      this.textColor.set(orgTheme.componentColors.footer.textColor)
      this.homeTrack.set(orgTheme.componentColors.footer.homeTrack)
    })
    this.audioService.currentTrack$.subscribe(track => {
      if (track) {
        this.homeTrack.set(track)
      }
    })
  }
}
