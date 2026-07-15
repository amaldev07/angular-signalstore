import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersStore } from './users.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly store = inject(UsersStore);
}
