import { Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import path from 'path';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { AppointmentPageComponent } from './appointment-page/appointment-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPainelComponent } from './admin-painel/admin-painel.component';

export const routes: Routes = [
  {
    path: '',
    component: FirstPageComponent,
  },
  {
    path: 'calendar',
    component: CalendarPageComponent,
  },
  {
    path: 'agendar/:date',
    component: AppointmentPageComponent,
  },
  {
    path: 'admin',
    component: AdminLoginComponent
  },
  {
    path: 'admin/painel',
    component: AdminPainelComponent
  }
];
