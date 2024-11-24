export type BookId = string

/**
 * In real world here would be a separate interface for API response and another interface for FE state.
 * Keeping BookEntity for api response and state management entity for simplicity.
 */
export interface BookEntity {
  id: BookId
  title: string
  imgUrl: string
  author: string
  publisher: string
  summary: string
  publishDate: number // timestamp
}

export type BookUpdateDTO = Omit<BookEntity, 'id'>
