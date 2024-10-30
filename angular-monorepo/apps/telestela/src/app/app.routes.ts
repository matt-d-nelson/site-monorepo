import { Route } from '@angular/router'

export const appRoutes: Route[] = [
    {   
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('@angular-monorepo/telestela-routes').then((m) => m.TelestelaHomeComponent)
    }
]
