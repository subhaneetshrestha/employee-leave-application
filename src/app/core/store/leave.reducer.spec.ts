import { leaveReducer } from './leave.reducers';
import {
  createLeave,
  updateLeave,
  getLeaves,
  deleteLeave,
} from './leave.actions';
import {
  Leave,
  LeaveState,
  UserLeave,
} from '../../pages/leave/types/leave.types';

describe('LeaveReducer', () => {
  it('should create a new leave on create leave action', () => {
    const initialLeaveState: LeaveState = {
      leaves: [],
      userLeave: {
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        remainingLeave: 10,
      },
      isLoading: false,
      error: '',
    };
    const newLeave: Leave = {
      id: 'eab2c4e1-e86d-2e2e-b82a-1deabdf2a2e2',
      employeeId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      date: new Date(2024, 4, 6),
      reason: 'Vacation',
      type: 'full_time',
    };
    const action = createLeave({ leave: newLeave });
    const newState = leaveReducer(initialLeaveState, action);

    expect(newState.leaves).toEqual([newLeave]);
  });

  it('should give error on create leave action', () => {
    const initialLeaveState: LeaveState = {
      leaves: [],
      userLeave: {
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        remainingLeave: 0,
      },
      isLoading: false,
      error: '',
    };
    const newLeave: Leave = {
      id: 'eab2c4e1-e86d-2e2e-b82a-1deabdf2a2e2',
      employeeId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      date: new Date(2024, 4, 6),
      reason: 'Vacation',
      type: 'full_time',
    };
    const action = createLeave({ leave: newLeave });
    const newState = leaveReducer(initialLeaveState, action);

    expect(newState.error).toEqual('No remaining leave');
  });

  it('should give error on create leave action', () => {
    const initialLeaveState: LeaveState = {
      leaves: [
        {
          id: '42f7e1c0-b8fe-4c2e-b08e-d47a2c1f1f2d',
          employeeId: 'EMP002',
          firstName: 'Jane',
          lastName: 'Smith',
          date: new Date(2024, 4, 25),
          reason: 'Sick Leave',
          type: 'full_time',
        },
        {
          id: '1abb5792-2fce-4d0b-8d7e-de231c8deabb',
          employeeId: 'EMP003',
          firstName: 'Michael',
          lastName: 'Scott',
          date: new Date(2024, 4, 25),
          reason: 'Birthday Party',
          type: 'full_time',
        },
        {
          id: 'f0ac781d-7a1d-4dca-a042-e28d1f23acbd',
          employeeId: 'EMP004',
          firstName: 'Dwight',
          lastName: 'Schrute',
          date: new Date(2024, 4, 25),
          reason: 'Beet Farm Inspection',
          type: 'full_time',
        },
      ],
      userLeave: {
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        remainingLeave: 10,
      },
      isLoading: false,
      error: '',
    };
    const newLeave: Leave = {
      id: 'eab2c4e1-e86d-2e2e-b82a-1deabdf2a2e2',
      employeeId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      date: new Date(2024, 4, 25),
      reason: 'Vacation',
      type: 'full_time',
    };
    const action = createLeave({ leave: newLeave });
    const newState = leaveReducer(initialLeaveState, action);

    expect(newState.error).toEqual('High volume leave.');
  });

  it('should update leave on updateLeave action', () => {
    const existingLeave: Leave = {
      id: 'eab2c4e1-e84d-4e2e-b82a-1deabdf2c1e2',
      employeeId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      date: new Date(2024, 4, 1),
      reason: 'Vacation',
      type: 'full_time',
    };
    const updatedLeave: Leave = {
      id: 'eab2c4e1-e84d-4e2e-b82a-1deabdf2c1e2',
      employeeId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      date: new Date(2024, 4, 1),
      reason: 'Vacation',
      type: 'part_time',
    };
    const existingState: LeaveState = {
      leaves: [existingLeave],
      error: '',
      isLoading: false,
      userLeave: {
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        remainingLeave: 10,
      },
    };
    const action = updateLeave({ leave: updatedLeave });
    const newState = leaveReducer(existingState, action);

    expect(newState.leaves).toEqual([updatedLeave]);
  });

  it('should remove leave on deleteLeave action', () => {
    const existingState: LeaveState = {
      leaves: [
        {
          id: 'eab2c4e1-e84d-4e2e-b82a-1deabdf2c1e2',
          employeeId: 'EMP001',
          firstName: 'John',
          lastName: 'Doe',
          date: new Date(2024, 4, 1),
          reason: 'Vacation',
          type: 'full_time',
        },
        {
          id: '42f7e1c0-b8fe-4c2e-b08e-d47a2c1f1f2d',
          employeeId: 'EMP002',
          firstName: 'Jane',
          lastName: 'Smith',
          date: new Date(2024, 2, 25),
          reason: 'Sick Leave',
          type: 'full_time',
        },
        {
          id: '1abb5792-2fce-4d0b-8d7e-de231c8deabb',
          employeeId: 'EMP003',
          firstName: 'Michael',
          lastName: 'Scott',
          date: new Date(2024, 3, 15),
          reason: 'Birthday Party',
          type: 'full_time',
        },
      ],
      error: '',
      isLoading: false,
      userLeave: {
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        remainingLeave: 10,
      },
    };
    const action = deleteLeave({
      leave: {
        id: 'eab2c4e1-e84d-4e2e-b82a-1deabdf2c1e2',
        employeeId: 'EMP001',
        firstName: 'John',
        lastName: 'Doe',
        date: new Date(2024, 4, 1),
        reason: 'Vacation',
        type: 'full_time',
      },
    });
    const newState = leaveReducer(existingState, action);

    expect(newState.leaves).toEqual([
      {
        id: '42f7e1c0-b8fe-4c2e-b08e-d47a2c1f1f2d',
        employeeId: 'EMP002',
        firstName: 'Jane',
        lastName: 'Smith',
        date: new Date(2024, 2, 25),
        reason: 'Sick Leave',
        type: 'full_time',
      },
      {
        id: '1abb5792-2fce-4d0b-8d7e-de231c8deabb',
        employeeId: 'EMP003',
        firstName: 'Michael',
        lastName: 'Scott',
        date: new Date(2024, 3, 15),
        reason: 'Birthday Party',
        type: 'full_time',
      },
    ]);
  });
});
