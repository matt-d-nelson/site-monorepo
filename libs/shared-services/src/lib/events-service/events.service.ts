import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NgxSpinnerService } from 'ngx-spinner'
import { ENV } from '@angular-monorepo/environments'
import { BehaviorSubject, finalize } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  _eventsCache = new BehaviorSubject<any[]>([])
  events$ = this._eventsCache.asObservable()

  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {}

  createEvent(orgId: string, body: {}) {
    return this.http.post(`${ENV.API_URL}/api/events/${orgId}`, body)
  }

  getEvents(orgId: string) {
    this.spinnerService.show()
    this.http
      .get(`${ENV.API_URL}/api/events/${orgId}`)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((events: any) => {
        this._eventsCache.next(events)
      })
  }

  deleteEvent(orgId: string, eventId: string) {
    this.spinnerService.show()
    this.http
      .delete(`${ENV.API_URL}/api/events/${orgId}`, {
        params: {
          eventId: eventId,
        },
      })
      .pipe(finalize(() => this.spinnerService.hide()))
  }
}
