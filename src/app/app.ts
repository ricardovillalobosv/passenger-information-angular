import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguaje } from './components/change-languaje/change-languaje';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChangeLanguaje],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('passenger-information-angular');

  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['es', 'en']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }
}
