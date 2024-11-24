import { Component, model } from '@angular/core'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [MatFormField, MatInput, MatLabel],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  keyword = model<string>('')

  setKeyword(value: string) {
    this.keyword.update(() => value.trim())
  }
}
