import { Component } from '@angular/core';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-form-book',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './form-book.component.html',
  styleUrl: './form-book.component.scss',
})
export class FormBookComponent {}
