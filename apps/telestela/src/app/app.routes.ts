import { Route } from '@angular/router'

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@angular-monorepo/shared-pages').then(m => m.HomePageComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('@angular-monorepo/shared-pages').then(m => m.AboutPageComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@angular-monorepo/shared-pages').then(m => m.LoginPageComponent),
  },
  {
    path: 'events',
    loadComponent: () =>
      import('@angular-monorepo/shared-pages').then(m => m.EventsPageComponent),
  },
  {
    path: 'video',
    loadComponent: () =>
      import('@angular-monorepo/shared-pages').then(m => m.VideosPageComponent),
  },
  {
    path: 'music',
    loadComponent: () =>
      import('@angular-monorepo/shared-pages').then(m => m.AlbumsPageComponent),
  },
]
