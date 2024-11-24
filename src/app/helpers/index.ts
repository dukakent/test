import { BookEntity } from '../models'

export function searchBooksByKeyword(books: BookEntity[], keyword: string) {
  /**
   * I know this searching function is not so optimal :) Ideally it should return these cases by priority descending:
   * 1. title starts with keyword
   * 2. author starts with keyword
   * 3. title includes keyword
   * 4. author includes keyword
   */

  const keywordLowercased = keyword.toLowerCase();
  const byTitle = books.filter(book => book.title.toLowerCase().startsWith(keywordLowercased))
  const byAuthor = books.filter(book => book.author.toLowerCase().startsWith(keywordLowercased))

  return [...byTitle, ...byAuthor].slice(0, 5)
}
