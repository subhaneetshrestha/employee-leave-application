import { Action, createReducer, on } from '@ngrx/store';
import {
  getLeaves,
  createLeave,
  createLeaveSuccess,
  updateLeave,
  updateLeaveSuccess,
  deleteLeave,
  deleteLeaveSuccess,
  getLeavesSuccess,
  getUserLeaves,
  getUserLeaveSuccess,
  getUserLeaveFailure,
  createLeaveFailure,
  updateLeaveFailure,
  deleteLeaveFailure,
} from './leave.actions';
import { LeaveState } from '../../pages/leave/types/leave.types';

export const initialLeaveState: LeaveState = {
  leaves: [],
  userLeave: {
    employeeId: '',
    firstName: '',
    lastName: '',
    remainingLeave: 0,
  },
  isLoading: false,
  error: '',
};

const reducer = createReducer<LeaveState>(
  initialLeaveState,
  on(getUserLeaves, (state) => {
    return {
      ...state,
      isLoading: true,
      error: '',
    };
  }),
  on(getUserLeaveSuccess, (state, { userLeave }) => {
    return {
      ...state,
      userLeave,
      isLoading: false,
      error: '',
    };
  }),
  on(getUserLeaveFailure, (state, { error }) => {
    return {
      ...state,
      error,
      isLoading: false,
    };
  }),
  on(getLeaves, (state) => {
    return {
      ...state,
      isLoading: true,
      error: '',
    };
  }),
  on(getLeavesSuccess, (state, { leaves }) => {
    return {
      ...state,
      isLoading: false,
      leaves,
      error: '',
    };
  }),
  on(createLeave, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(createLeaveSuccess, (state, { leave }) => {
    return {
      ...state,
      leaves: [...state.leaves, leave],
      userLeave: Object.assign({}, state.userLeave, {
        remainingLeave:
          leave.type === 'full_time'
            ? state.userLeave.remainingLeave - 1
            : state.userLeave.remainingLeave - 0.5,
      }),
      isLoading: false,
      error: '',
    };
  }),
  on(createLeaveFailure, (state, { error }) => {
    return {
      ...state,
      error: error.message,
      isLoading: false,
    };
  }),
  on(updateLeave, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(updateLeaveSuccess, (state, { leave }) => {
    return {
      ...state,
      leaves: state.leaves.map((b) => (b.id === leave.id ? leave : b)),
      userLeave: Object.assign({}, state.userLeave, {
        remainingLeave:
          leave.type !== state.leaves.find((l) => l.id === leave.id)?.type
            ? leave.type === 'full_time'
              ? state.userLeave.remainingLeave + 0.5
              : state.userLeave.remainingLeave - 0.5
            : state.userLeave.remainingLeave,
      }),
      isLoading: false,
      error: '',
    };
  }),
  on(updateLeaveFailure, (state, { error }) => {
    return {
      ...state,
      error: error.message,
      isLoading: false,
    };
  }),
  on(deleteLeave, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(deleteLeaveSuccess, (state, { leave }) => {
    return {
      ...state,
      isLoading: false,
      leaves: state.leaves.filter((b) => b.id !== leave.id),
      userLeave: Object.assign({}, state.userLeave, {
        remainingLeave:
          leave.type === 'full_time'
            ? state.userLeave.remainingLeave + 1
            : state.userLeave.remainingLeave + 0.5,
      }),
      error: '',
    };
  }),
  on(deleteLeaveFailure, (state, { error }) => {
    return {
      ...state,
      error: error.message,
      isLoading: false,
    };
  })
);

export function leaveReducer(
  state = initialLeaveState,
  actions: Action
): LeaveState {
  return reducer(state, actions);
}
