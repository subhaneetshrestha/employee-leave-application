import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { LeaveEffects } from './core/effects/leave.effects';
import { leaveReducer } from './core/store/leave.reducers';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'leave',
  },
  {
    path: 'leave',
    loadChildren: () =>
      import('./pages/leave/leave.routes').then((route) => route.LEAVE_ROUTES),
  },
];
