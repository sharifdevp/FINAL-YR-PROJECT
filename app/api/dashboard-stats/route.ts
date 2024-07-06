import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { subMonths, startOfMonth, endOfMonth } from 'date-fns';

//api/dashboard-stats/route.ts

export const GET = async (req: NextRequest) => {
  try {
    const now = new Date();
    const lastMonth = subMonths(now, 1);
    const thisMonthStart = startOfMonth(now);
    const lastMonthStart = startOfMonth(lastMonth);
    const lastMonthEnd = endOfMonth(lastMonth);

    // Fetch total users
    const totalUsers = await prisma.user.count();

    // Fetch total leaves
    const totalLeaves = await prisma.leave.count();

    // Fetch total events
    const totalEvents = await prisma.events.count();

    // Fetch pending requests
    const pendingRequests = await prisma.leave.count({
      where: {
        status: 'PENDING',
      },
    });
    // Fetch approved requests
    const approvedRequests = await prisma.leave.count({
      where: {
        status: 'APPROVED',
      },
    });

    // Calculate changes
    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: lastMonthStart,
          lte: now,
        },
      },
    });

    const newLeaves = await prisma.leave.count({
      where: {
        createdAt: {
          gte: lastMonthStart,
          lte: now,
        },
      },
    });

    const newEvents = await prisma.events.count({
      where: {
        startDate: {
          // createdAt: {
          gte: lastMonthStart,
          lte: now,
        },
      },
    });

    const newPendingRequests = await prisma.leave.count({
      where: {
        status: 'PENDING',
        createdAt: {
          gte: lastMonthStart,
          lte: now,
        },
      },
    });

    const newApprovedRequests = await prisma.leave.count({
      where: {
        status: 'APPROVED',
        updatedAt: {
          gte: lastMonthStart,
          lte: now,
        },
      },
    });

    // Prepare the data
    const statsData = [
      {
        key: 'leave',
        title: 'Total Leaves for this year',
        change: newLeaves,
        value: totalLeaves,
        icon: 'TbListCheck',
      },
      {
        key: 'user',
        title: 'Total Users for this year',
        change: newUsers,
        value: totalUsers,
        icon: 'HiOutlineUserGroup',
      },
      {
        key: 'event',
        title: 'Upcoming Events for this year',
        change: newEvents,
        value: totalEvents,
        icon: 'RiCalendarEventLine',
      },
      {
        key: 'pending',
        title: 'Pending Leaves for this year',
        change: newPendingRequests,
        value: pendingRequests,
        icon: 'MdOutlinePending',
      },
      {
        key: 'approved',
        title: 'Approved Leaves for this year',
        change: newApprovedRequests,
        value: approvedRequests,
        icon: 'MdCheckCircle',
      },
    ];

    return NextResponse.json(statsData);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
