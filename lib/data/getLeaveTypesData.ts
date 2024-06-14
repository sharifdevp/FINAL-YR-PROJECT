import { getCurrentUser } from '@/lib/sessions/userSession';
import prisma from '@/lib/prisma';

export async function getLeaveTypesData() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  try {
    const leaveTypesData = await prisma.leaveType.findMany({});

    return [...leaveTypesData];
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error('Error fetching user info');
  }
}
