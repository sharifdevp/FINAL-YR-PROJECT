export const leaveTypes = [
  {
    id: 1,
    value: 'Annual',
    label: 'ANNUAL',
    description: 'Paid time off for vacation or personal days.',
  },
  {
    id: 2,
    value: 'Sick',
    label: 'SICK',
    description: 'Time off due to illness or medical appointments.',
  },
  {
    id: 3,
    value: 'Maternity',
    label: 'MATERNITY',
    description: 'Leave for childbirth and postnatal care',
  },
  {
    id: 4,
    value: 'Paternity',
    label: 'PATERNITY',
    description: 'Leave for fathers after the birth of a child',
  },
  {
    id: 5,
    value: 'Emergency',
    label: 'EMERGENCY',
    description: 'Time off for urgent and unexpected situations.',
  },
  {
    id: 6,
    value: 'Compensation',
    label: 'COMPENSATION',
    description: 'Time off granted as a substitute for extra hours worked.',
  },
  {
    id: 7,
    value: 'Unpaid',
    label: 'UNPAID',
    description: 'Time off without pay for personal reasons.',
  },
] as const;

export const UserRoles = ['ADMIN', 'USER'] as const;

export const leaveStatus = ['APPROVED', 'REJECTED'] as const;
