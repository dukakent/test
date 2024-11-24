import { computed, Injectable, Signal, signal } from '@angular/core'

import { BookEntity, BookId } from '../models'
import { searchBooksByKeyword } from '../helpers'

@Injectable({ providedIn: 'root' })
export class StoreBooksService {
  readonly entities = signal<BookEntity[]>([])
  readonly keyword = signal<string>('')
  readonly loading = signal<boolean>(false)
  readonly errors = signal<string[]>([])

  getBookList() {
    return computed(() => {
      const keyword = this.keyword()

      if (!keyword.length) {
        return this.entities()
      }

      return searchBooksByKeyword(this.entities(), keyword)
    })
  }

  getBookDetails(bookId: BookId): Signal<BookEntity | null> {
    return computed(() => this.entities().find((entity) => entity.id === bookId) || null)
  }

  setEntities(books: BookEntity[]): void {
    this.entities.set(books)
  }

  prependEntity(entity: BookEntity): void {
    this.entities.update((value) => {
      return [entity, ...value]
    })
  }

  updateEntity(entityToUpdate: BookEntity): void {
    this.entities.update((value) => {
      const valueCopy = [...value]
      const foundEntityIndex = valueCopy.findIndex((entity) => entity.id === entityToUpdate.id)

      if (foundEntityIndex >= 0) {
        valueCopy[foundEntityIndex] = entityToUpdate
      }

      return valueCopy
    })
  }

  removeEntity(bookId: BookId): void {
    this.entities.update((value) => [...value.filter((entity) => entity.id !== bookId)])
  }

  setKeyword(keyword: string) {
    this.keyword.update(() => keyword.trim())
  }

  setLoading(loadingValue: boolean): void {
    this.loading.set(loadingValue)
  }
}
