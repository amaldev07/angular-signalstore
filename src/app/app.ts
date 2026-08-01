import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  count = signal(0);
  increment() {
    this.count.update(val => val + 1);
  }
  decrement() {
    this.count.update(val => val - 1);
  }
  reset() {
    this.count.set(0);
  }
}
