import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  repeat,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { LeaveService } from '../../pages/leave/services/leave.service';
import { Leave, UserLeave } from '../../pages/leave/types/leave.types';
import {
  getLeaves,
  createLeave,
  createLeaveSuccess,
  updateLeave,
  updateLeaveSuccess,
  deleteLeave,
  deleteLeaveSuccess,
  getLeavesSuccess,
  validateLeave,
  validateLeaveSuccess,
  getUserLeaves,
  getUserLeaveSuccess,
  createLeaveFailure,
  updateLeaveFailure,
  deleteLeaveFailure,
} from '../store/leave.actions';
import { of } from 'rxjs';

@Injectable()
export class LeaveEffects {
  private actions$ = inject(Actions);
  private leaveService = inject(LeaveService);

  getUserLeaves$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserLeaves.type),
      switchMap(() => this.leaveService.getUserLeave()),
      map((userLeave: UserLeave) => getUserLeaveSuccess({ userLeave }))
    )
  );

  getLeaves$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLeaves.type),
      switchMap(() => this.leaveService.getAll()),
      map((leaves: Leave[]) => getLeavesSuccess({ leaves }))
    )
  );

  createLeave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createLeave),
      switchMap(({ leave }) => {
        return this.leaveService
          .validateLeave(leave)
          .pipe(switchMap(() => this.leaveService.create(leave)));
      }),
      map((leave: Leave) => createLeaveSuccess({ leave })),
      catchError((error) => of(createLeaveFailure({ error }))),
      repeat()
    )
  );

  updateLeave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLeave),
      switchMap(({ leave }) => {
        return this.leaveService
          .validateLeave(leave)
          .pipe(switchMap(() => this.leaveService.create(leave)));
      }),
      map((leave: Leave) => updateLeaveSuccess({ leave })),
      catchError((error) => of(updateLeaveFailure({ error }))),
      repeat()
    )
  );

  deleteLeave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteLeave),
      switchMap(({ leave }) => this.leaveService.delete(leave)),
      map((leave: Leave) => deleteLeaveSuccess({ leave })),
      catchError((error) => of(deleteLeaveFailure({ error }))),
      repeat()
    )
  );

  validateLeaveBalance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(validateLeave),
      switchMap(({ leave }) => this.leaveService.validateLeave(leave)),
      map((isValid: boolean) => validateLeaveSuccess({ isValid }))
    )
  );
}
