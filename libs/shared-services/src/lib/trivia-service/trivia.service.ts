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

  getTriviaQuestions(triviaId: string) {
    // `${ENV.API_URL}/api/trivia/questions/${triviaId}`
    return of(this.questionsTemp)
  }

  createTriviaDraft(orgId: string) {
    console.log(orgId)
    this.spinnerService.show()
    // TODO: send req
    // `${ENV.API_URL}/api/trivia/draft/${orgId}`
    return of({ id: 'test-id' }).pipe(
      finalize(() => this.spinnerService.hide())
    )
  }

  createTriviaQuestion(orgId: string, triviaId: string, questionData: any) {
    console.log(triviaId)
    // `${ENV.API_URL}/api/trivia/questions/${orgId}/${triviaId}`
    questionData.id = `${Math.random()}`
    this.questionsTemp.push(questionData)
    console.log(this.questionsTemp)
    return of('test')
  }
}
