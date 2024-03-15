import { Routes } from '@angular/router';

export const LEAVE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'view',
  },
  {
    path: 'view',
    loadComponent: () =>
      import('./components/leave-view/leave-view.component').then(
        (component) => component.LeaveViewComponent
      ),
  },
];
