import { Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import path from 'path';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';

export const routes: Routes = [
  {
    path: '',
    component: FirstPageComponent,
  },
  {
    path: 'calendar',
    component: CalendarPageComponent
  }
];
