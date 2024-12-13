import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core'
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router'
import { appRoutes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { JwtInterceptor } from '@angular-monorepo/shared-utilities'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptors([JwtInterceptor])),
    importProvidersFrom([BrowserAnimationsModule]),
  ],
}
