import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

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
  doubleCount = computed(() => {
    return this.count() * 2;
  });

  isPositive = computed(() => {
    return this.count() > 0;
  })

  message = computed(() => {
    return this.isPositive() ? 'Positive' : 'Negative';
  })
}
