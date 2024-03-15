import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { Store, select } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';

import { selectUserLeave } from './core/selectors/leave.selectors';
import { Observable } from 'rxjs';
import { UserLeave } from './pages/leave/types/leave.types';
import { getUserLeaves } from './core/store/leave.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatIcon,
    MatToolbar,
    MatToolbarRow,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store);

  opened = false;
  user$: Observable<UserLeave> | undefined;

  ngOnInit(): void {
    this.store.dispatch(getUserLeaves());
    this.user$ = this.store.pipe(select(selectUserLeave));
  }
}
