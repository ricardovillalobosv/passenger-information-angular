import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface LanguajeOption {
  label: string;
  value: string;
  selected: boolean;
}

@Component({
  selector: 'app-change-languaje',
  imports: [],
  templateUrl: './change-languaje.html',
  styleUrl: './change-languaje.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeLanguaje {
  private translate = inject(TranslateService);

  languajeOptions: LanguajeOption[] = [
    { label: 'EN', value: 'en', selected: true },
    { label: 'ES', value: 'es', selected: false },
  ];

  changeLanguage(language: string) {
    this.languajeOptions = this.languajeOptions.map((option) => ({
      ...option,
      selected: option.value === language,
    }));
    this.translate.use(language);
  }
}
