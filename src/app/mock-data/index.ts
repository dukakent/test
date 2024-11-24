import { faker } from '@faker-js/faker'

import { BookEntity } from '../models'

export function fakeResponseTimeMs() {
  return faker.number.int({
    min: 10,
    max: 100,
  })
}

export function fakeNumberOfBooks() {
  return faker.number.int({
    min: 5,
    max: 10,
  })
}

export function fakeUuid() {
  return faker.string.uuid()
}

export function fakeBooks(): BookEntity[] {
  return Array(fakeNumberOfBooks())
    .fill(null)
    .map(() => ({
      id: fakeUuid(),
      title: faker.lorem.sentence(),
      author: faker.person.fullName(),
      imgUrl: `https://placehold.co/600x400`,
      publisher: `${faker.person.lastName()} Books(c)`,
      summary: faker.lorem.sentence(),
      publishDate: faker.date.past().getTime()
    }))
}
