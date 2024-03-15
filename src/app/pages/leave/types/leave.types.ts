export type Leave = {
  id: string | null;
  employeeId: string;
  firstName: string;
  lastName: string;
  type: 'part_time' | 'full_time';
  date: Date;
  reason: string;
};

export type UserLeave = {
  employeeId: string;
  firstName: string;
  lastName: string;
  remainingLeave: number;
};

export type LeaveState = {
  leaves: Leave[];
  userLeave: UserLeave;
  isLoading: boolean;
  error: string;
};
