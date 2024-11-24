import { ORGIDS, OrgThemes } from '@angular-monorepo/shared-constants'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class OrgService {
  constructor() {}

  private _currentOrgId = new BehaviorSubject<ORGIDS>(ORGIDS.NONE)
  currentOrgId$ = this._currentOrgId.asObservable()

  private _currentOrgTheme = new BehaviorSubject({})
  currentOrgTheme$ = this._currentOrgTheme.asObservable()

  setCurrentOrg(orgId: ORGIDS) {
    this._currentOrgId.next(orgId)
    this.setCurrentOrgTheme(orgId)
  }

  setCurrentOrgTheme(orgId: ORGIDS) {
    return orgId === ORGIDS.NONE
      ? {}
      : this._currentOrgTheme.next(OrgThemes[orgId])
  }
}
