import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Leave } from '../types/leave.types';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  userLeave = {
    employeeId: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    remainingLeave: 10,
  };

  mockLeaves: Leave[] = [
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
    {
      id: 'f0ac781d-7a1d-4dca-a042-e28d1f23acbd',
      employeeId: 'EMP004',
      firstName: 'Dwight',
      lastName: 'Schrute',
      date: new Date(2024, 4, 3),
      reason: 'Beet Farm Inspection',
      type: 'full_time',
    },
    {
      id: 'd5be129a-f082-4a8e-8d1c-de217b8427ab',
      employeeId: 'EMP005',
      firstName: 'Pam',
      lastName: 'Beesly',
      date: new Date(2024, 4, 3),
      reason: 'Art Class',
      type: 'part_time',
    },
    {
      id: '231f4e72-a09b-441e-a9b0-d1c47b28f21d',
      employeeId: 'EMP006',
      firstName: 'Jim',
      lastName: 'Halpert',
      date: new Date(2024, 3, 20),
      reason: 'Prank Dwight Day',
      type: 'part_time',
    },
    {
      id: '9c3ebf1a-e21d-48b8-8a1d-1b98732f4aed',
      employeeId: 'EMP007',
      firstName: 'Angela',
      lastName: 'Martin',
      date: new Date(2024, 4, 3),
      reason: 'Cat Appointment',
      type: 'full_time',
    },
    {
      id: '67821c5a-b34e-4d9b-a48e-1782b0abcf2d',
      employeeId: 'EMP008',
      firstName: 'Oscar',
      lastName: 'Martinez',
      date: new Date(2024, 4, 5),
      reason: 'Accounting Deadline',
      type: 'part_time',
    },
    {
      id: 'ea1f237b-d09e-4e2e-928b-2cab48d21a2d',
      employeeId: 'EMP009',
      firstName: 'Kevin',
      lastName: 'Malone',
      date: new Date(2024, 4, 2),
      reason: 'Casino Night',
      type: 'full_time',
    },
    {
      id: '01b3df42-78ce-4a2b-871d-b07e2ac14b1d',
      employeeId: 'EMP010',
      firstName: 'Creed',
      lastName: 'Bratton',
      date: new Date(2024, 4, 1),
      reason: 'Quality Time with Bob Vance, Vance Refrigeration',
      type: 'full_time',
    },
  ];
  /**
   * Fetch the leaves taken by employee
   * @param employeeId string
   * @returns Leave
   */
  getByEmployeeId(employeeId: string) {
    return of(this.mockLeaves.find((leave) => leave.employeeId === employeeId));
  }

  /**
   * Fetches all leave
   * @param id string
   * @returns Leave
   */
  getAll() {
    return of(this.mockLeaves);
  }

  /**
   * Get leave by id
   * @param id
   * @returns
   */
  getById(id: string) {
    return of(this.mockLeaves.find((leave) => leave.id === id));
  }

  /**
   * Get userinfo
   * @returns
   */
  getUserLeave() {
    return of(this.userLeave);
  }

  /**
   * Creates a new leave
   * @param leave Leave
   * @returns Leave
   */
  create(leave: Leave) {
    this.userLeave = Object.assign({}, this.userLeave, {
      remainingLeave:
        leave.type === 'full_time'
          ? this.userLeave.remainingLeave - 1
          : this.userLeave.remainingLeave - 0.5,
    });

    this.mockLeaves = [...this.mockLeaves, leave];
    return of(leave);
  }

  /**
   * Update an existing leave\
   * @param leave Leave
   * @returns Leave[]
   */
  update(leave: Leave) {
    this.mockLeaves.map((l) => (l.id === leave.id ? leave : leave));
    this.userLeave = Object.assign({}, this.userLeave, {
      remainingLeave:
        leave.type !== this.mockLeaves.find((l) => l.id === leave.id)?.type
          ? leave.type === 'full_time'
            ? this.userLeave.remainingLeave + 0.5
            : this.userLeave.remainingLeave - 0.5
          : this.userLeave.remainingLeave,
    });

    return of(leave);
  }

  /**
   * Deletes a leave
   * @param leave Leave
   * @returns Leave[]
   */
  delete(leave: Leave) {
    this.mockLeaves = this.mockLeaves.filter((l) => l.id !== leave.id);
    this.userLeave = Object.assign({}, this.userLeave, {
      remainingLeave:
        leave.type === 'full_time'
          ? this.userLeave.remainingLeave + 1
          : this.userLeave.remainingLeave + 0.5,
    });
    return of(leave);
  }

  /**
   * Validate if leave coincides with high volume requests
   * We assume if there are already 3 leave on same day then it would be high volume
   * @param leave Leave
   * @returns
   */
  validateLeave(leave: Leave) {
    if (leave.type === 'full_time' && this.userLeave.remainingLeave < 1)
      throw new Error('No remaining leave');
    if (leave.type === 'part_time' && !this.userLeave.remainingLeave)
      throw new Error('No remaining leave');
    const isLeaveValid =
      this.mockLeaves.filter((l) => l.date.getTime() === leave.date.getTime())
        .length < 3;

    if (!isLeaveValid) throw new Error('High volume leave.');
    return of(true);
  }
}
