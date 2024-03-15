import { createAction, props } from '@ngrx/store';
import { Leave, UserLeave } from '../../pages/leave/types/leave.types';

const prefix = '[Leaves]';

export const getLeaves = createAction(`${prefix} Get Leaves`);
export const getLeavesSuccess = createAction(
  `${getLeaves.type} Success`,
  props<{
    leaves: Leave[];
  }>()
);

export const getLeaveFailure = createAction(
  `${getLeaves.type} Failure`,
  props<{ error: Error | any }>()
);

export const createLeave = createAction(
  `${prefix} Create Leave`,
  props<{
    leave: Leave;
  }>()
);

export const createLeaveSuccess = createAction(
  `${createLeave.type} Success`,
  props<{
    leave: Leave;
  }>()
);

export const createLeaveFailure = createAction(
  `${createLeave.type} Failure`,
  props<{ error: Error | any }>()
);

export const updateLeave = createAction(
  `${prefix} Update Leave`,
  props<{
    leave: Leave;
  }>()
);

export const updateLeaveSuccess = createAction(
  `${updateLeave.type} Success`,
  props<{
    leave: Leave;
  }>()
);

export const updateLeaveFailure = createAction(
  `${updateLeave.type} Failure`,
  props<{ error: Error | any }>()
);

export const deleteLeave = createAction(
  `${prefix} Delete Leave`,
  props<{
    leave: Leave;
  }>()
);

export const deleteLeaveSuccess = createAction(
  `${deleteLeave.type} Success`,
  props<{
    leave: Leave;
  }>()
);

export const deleteLeaveFailure = createAction(
  `${updateLeave.type} Failure`,
  props<{ error: Error | any }>()
);

export const validateLeave = createAction(
  `${prefix} Validate Leave`,
  props<{
    leave: Leave;
  }>()
);

export const validateLeaveSuccess = createAction(
  `${validateLeave.type} Success`,
  props<{
    isValid: boolean;
  }>()
);

export const getUserLeaves = createAction(`${prefix} Get User Leaves`);

export const getUserLeaveSuccess = createAction(
  `${getUserLeaves.type} Success`,
  props<{
    userLeave: UserLeave;
  }>()
);

export const getUserLeaveFailure = createAction(
  `${getUserLeaves.type} Failure`,
  props<{ error: Error | any }>()
);
