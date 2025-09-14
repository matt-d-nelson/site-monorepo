import { ENV } from '@angular-monorepo/environments'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { BehaviorSubject, finalize, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {}

  _triviaGamesCache = new BehaviorSubject([])
  triviaGames$ = this._triviaGamesCache.asObservable()

  questionsTemp: any[] = []

  getTriviaGames(orgId: string) {
    this.spinnerService.show()
    this.http
      .get(`${ENV.API_URL}/api/trivia/${orgId}`)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((games: any) => {
        this._triviaGamesCache.next(games)
      })
  }

  createTriviaDraft(orgId: string) {
    this.spinnerService.show()
    return this.http
      .post(`${ENV.API_URL}/api/trivia/draft/${orgId}`, {})
      .pipe(finalize(() => this.spinnerService.hide()))
  }

  publishTriviaDraft(orgId: string, triviaId: string, triviaData: any) {
    return this.http.patch(
      `${ENV.API_URL}/api/trivia/publish/${orgId}/${triviaId}`,
      triviaData
    )
  }

  activateTriviaGame(orgId: string, triviaId: string, setActive: boolean) {
    this.spinnerService.show()
    return this.http
      .patch(`${ENV.API_URL}/api/trivia/activate/${orgId}/${triviaId}`, {
        setActive: setActive,
      })
      .pipe(finalize(() => this.spinnerService.hide()))
  }

  deleteTriviaGame(orgId: string, triviaId: string) {
    return this.http.delete(`${ENV.API_URL}/api/trivia/${orgId}`, {
      params: {
        triviaId: triviaId,
      },
    })
  }

  createTriviaQuestion(orgId: string, triviaId: string, questionData: any) {
    return this.http.post(
      `${ENV.API_URL}/api/trivia/question/${orgId}/${triviaId}`,
      questionData
    )
  }

  deleteTriviaQuestion(orgId: string, questionId: string) {
    return this.http.delete(`${ENV.API_URL}/api/trivia/question/${orgId}`, {
      params: {
        questionId: questionId,
      },
    })
  }

  submitTriviaAnswers(orgId: string, triviaId: string, data: any) {
    return this.http.post(
      `${ENV.API_URL}/api/trivia/submission/${orgId}/${triviaId}`,
      data
    )
  }

  getTriviaLeaderboards(triviaId: string) {
    return this.http.get(`${ENV.API_URL}/api/trivia/leaderboard/${triviaId}`)
  }
}
