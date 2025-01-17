import { SafeResourceUrl } from '@angular/platform-browser'

export interface Video {
  id: string
  name: string
  description: string
  link: string
  safeLink: SafeResourceUrl | null
}
