import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeaveState } from '../../pages/leave/types/leave.types';

export const selectLeaveState = createFeatureSelector<LeaveState>('leave');
export const selectLeavesList = createSelector(
  selectLeaveState,
  (state) => state.leaves
);

export const selectUserLeave = createSelector(
  selectLeaveState,
  (state) => state.userLeave
);

export const selectLeaveIsLoading = createSelector(
  selectLeaveState,
  (state) => state.isLoading
);

export const selectLeaveError = createSelector(
  selectLeaveState,
  (state: { error: string }) => state.error
);

export const selectLeaveById = (id: string) =>
  createSelector(selectLeaveState, (state) =>
    state?.leaves.find((leave) => leave.id === id)
  );

export const selectLeaveByEmployeeId = (employeeId: string) =>
  createSelector(selectLeaveState, (state) =>
    state?.leaves.filter((leave) => leave.employeeId === employeeId)
  );
