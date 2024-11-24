import { Component, inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog'

import { BookId } from '../../models'
import { StoreBooksService } from '../../store/store-books.service'
import { MatIcon } from '@angular/material/icon'
import { MatIconButton } from '@angular/material/button'
import { DatePipe } from '@angular/common'

export interface ModalDataBookDetails {
  bookId: BookId
}

@Component({
  selector: 'app-modal-book-details',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatIcon, MatDialogClose, MatIconButton, DatePipe],
  templateUrl: './modal-book-details.component.html',
  styleUrl: './modal-book-details.component.scss',
})
export class ModalBookDetailsComponent {
  private readonly store = inject(StoreBooksService)
  private readonly data = inject<ModalDataBookDetails>(MAT_DIALOG_DATA)

  readonly bookId = this.data.bookId
  readonly book = this.store.getBookDetails(this.bookId)
}
