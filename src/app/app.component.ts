import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { MatAnchor, MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatAnchor, RouterLink, MatButtonModule],
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly user = {
    name: 'Jon',
  }

  getName() {
    return this.user.name
  }
}
