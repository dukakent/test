import { Component, inject } from '@angular/core'
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-modal-confirmation',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButton, MatDialogClose],
  templateUrl: './modal-confirmation.component.html',
  styleUrl: './modal-confirmation.component.scss',
})
export class ModalConfirmationComponent {
  readonly dialogRef = inject(MatDialogRef)

  yes() {
    this.dialogRef.close({ yes: true })
  }
}
