import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./containers/page-home/home.page'),
  },
  {
    path: 'other',
    loadComponent: () => import('./containers/page-other/other.page'),
  },
  {
    path: 'books',
    loadComponent: () => import('./containers/page-books/books.page'),
  },
]
