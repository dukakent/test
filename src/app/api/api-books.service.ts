import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { map, Observable, timer } from 'rxjs'

import { BookEntity, BookId, BookUpdateDTO } from '../models'
import { fakeBooks, fakeResponseTimeMs, fakeUuid } from '../mock-data'

@Injectable({ providedIn: 'root' })
export class ApiBooksService {
  private http = inject(HttpClient)

  getList(): Observable<BookEntity[]> {
    /**
     * here should be this.http.get(...)
     * timer() simulates network response time
     */

    return timer(fakeResponseTimeMs()).pipe(map(() => fakeBooks()))
  }

  createBook(body: BookUpdateDTO): Observable<BookEntity> {
    /**
     * here should be this.http.post(...)
     */
    return timer(fakeResponseTimeMs()).pipe(
      map(() => ({
        id: fakeUuid(),
        ...body,
      })),
    )
  }

  updateBook(bookId: BookId, body: BookUpdateDTO): Observable<BookEntity> {
    /**
     * here should be this.http.put(...)
     */
    return timer(fakeResponseTimeMs()).pipe(
      map(() => ({
        id: bookId,
        ...body,
      })),
    )
  }

  removeBook(bookId: BookId): Observable<void> {
    /**
     * here should be this.http.delete(...)
     */

    return timer(fakeResponseTimeMs()).pipe(map(() => undefined))
  }
}
