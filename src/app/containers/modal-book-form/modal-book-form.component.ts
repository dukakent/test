import { Component, inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatButton } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIcon } from '@angular/material/icon'
import { StoreBooksService } from '../../store/store-books.service'
import { ApiBooksService } from '../../api/api-books.service'
import { BookEntity, BookId, BookUpdateDTO } from '../../models'
import { finalize } from 'rxjs'
import { trim } from 'lodash-es'

export interface ModalDataBookForm {
  bookId: BookId
}

@Component({
  selector: 'app-modal-book-add',
  standalone: true,
  imports: [
    DatePipe,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogActions,
    MatDialogClose,
    MatIcon,
    MatButton,
    MatDatepickerModule,
  ],
  templateUrl: './modal-book-form.component.html',
  styleUrl: './modal-book-form.component.scss',
})
export class ModalBookFormComponent implements OnInit {
  private readonly store = inject(StoreBooksService)
  private readonly api = inject(ApiBooksService)
  private readonly dialogRef = inject(MatDialogRef)
  private readonly data = inject<ModalDataBookForm>(MAT_DIALOG_DATA)

  readonly form = this.createForm()

  mode: 'add' | 'edit' = 'add'

  ngOnInit() {
    if (this.data?.bookId) {
      this.mode = 'edit'
      this.prefillForm()
    }
  }

  createForm(): FormGroup {
    return new FormGroup({
      title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      author: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      publisher: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      summary: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      publishDate: new FormControl<string>('', { validators: [Validators.required] }),
    })
  }

  prefillForm() {
    const bookToEditSignal = this.store.getBookDetails(this.data.bookId)
    const book = bookToEditSignal()

    const publishDate = new Date(book?.publishDate as number).toLocaleDateString('en-US')

    console.log(publishDate)

    this.form.reset({
      title: book?.title,
      author: book?.author,
      publisher: book?.publisher,
      summary: book?.summary,
      publishDate
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const formValue = this.form.value

    const value: BookUpdateDTO = {
      imgUrl: 'https://placehold.co/600x400',
      title: trim(formValue.title),
      author: trim(formValue.author),
      publisher: trim(formValue.publisher),
      summary: trim(formValue.summary),
      publishDate: new Date(formValue.publishDate).getTime(),
    }

    switch (this.mode) {
      case 'edit':
        this.editBook(value)
        break
      case 'add':
        this.addBook(value)
        break
      default:
    }
  }

  addBook(value: BookUpdateDTO) {
    this.store.setLoading(true)
    this.api
      .createBook(value)
      .pipe(
        finalize(() => {
          this.store.setLoading(false)
          this.dialogRef.close()
        }),
      )
      .subscribe((newBookEntity: BookEntity) => {
        this.store.prependEntity(newBookEntity)
      })
  }

  editBook(value: BookUpdateDTO) {
    this.store.setLoading(true)
    this.api
      .updateBook(this.data.bookId, value)
      .pipe(
        finalize(() => {
          this.store.setLoading(false)
          this.dialogRef.close()
        }),
      )
      .subscribe((updatedBook: BookEntity) => {
        this.store.updateEntity(updatedBook)
      })
  }
}
