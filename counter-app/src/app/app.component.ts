import { Component, signal, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { SecondCounterComponent } from './components/second-counter/second-counter.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterComponent, SecondCounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = signal<string>(`NgRx Counter Application - Angular ${VERSION.major}`);
}
