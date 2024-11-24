import { DatePipe, NgOptimizedImage } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { filter, finalize } from 'rxjs'

import { ApiBooksService } from '../../api/api-books.service'
import { StoreBooksService } from '../../store/store-books.service'
import { BookId } from '../../models'
import { MatMenu, MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialog } from '@angular/material/dialog'
import { ModalBookDetailsComponent, ModalDataBookDetails } from '../modal-book-details/modal-book-details.component'
import { ModalBookFormComponent, ModalDataBookForm } from '../modal-book-form/modal-book-form.component'
import { ModalConfirmationComponent } from '../../components/modal-confirmation/modal-confirmation.component'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatFormField, MatInput } from '@angular/material/input'
import { SearchInputComponent } from '../../components/search-input/search-input.component'

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatMenu,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    SearchInputComponent,
    NgOptimizedImage,
  ],
  templateUrl: './books.page.html',
  styleUrl: './books.page.scss',
})
export default class BooksPage implements OnInit {
  private readonly store = inject(StoreBooksService)
  private readonly api = inject(ApiBooksService)
  private readonly dialog = inject(MatDialog)

  readonly displayedColumns = ['bookOrder', 'bookImage', 'bookTitle', 'bookAuthor', 'bookPublishDate', 'bookActions']

  readonly booksList = this.store.getBookList()
  readonly keyword = this.store.keyword

  ngOnInit() {
    this.fetchBooksList()
  }

  fetchBooksList(): void {
    /**
     * In real world such complex actions should be moved to a facade service
     */
    this.store.setLoading(true)
    this.api
      .getList()
      .pipe(finalize(() => this.store.setLoading(false)))
      .subscribe((books) => this.store.setEntities(books))
  }

  getBookOrder(bookId: BookId) {
    return this.booksList().findIndex((entity) => entity.id === bookId) + 1
  }

  openModalAddBook() {
    this.dialog.open(ModalBookFormComponent, { width: '600px' })
  }

  openModalEditBook(bookId: BookId) {
    this.dialog.open(ModalBookFormComponent, {
      width: '600px',
      data: {
        bookId: bookId,
      } as ModalDataBookForm,
    })
  }

  openModalBookDetails(bookId: BookId): void {
    this.dialog.open(ModalBookDetailsComponent, {
      width: '600px',
      data: {
        bookId,
      } as ModalDataBookDetails,
    })
  }

  openModalRemoveBook(bookId: BookId) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent)

    dialogRef
      .afterClosed()
      .pipe(filter((value) => !!value.yes))
      .subscribe(() => {
        this.removeBook(bookId)
      })
  }

  removeBook(bookId: BookId) {
    this.store.setLoading(true)
    this.api
      .removeBook(bookId)
      .pipe(finalize(() => this.store.setLoading(false)))
      .subscribe(() => {
        this.store.removeEntity(bookId)
      })
  }

  setKeyword(keyword: string) {
    this.store.setKeyword(keyword)
  }
}
