import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const leaveData = await prisma.leave.findMany({
      where: {
        status: 'APPROVED',
      },
      select: {
        userName: true,
        days: true,
        type: true,
        requestedOn: true,
        moderator: true,
        updatedAt: true,
        userId: true, // Include userId to fetch the department
      },
    });

    // Fetch department name for each leave
    const formattedLeaveData = await Promise.all(
      leaveData.map(async (leave) => {
        const user = await prisma.user.findUnique({
          where: { id: leave.userId },
          select: { departmentName: true },
        });

        return {
          userName: leave.userName,
          department: user?.departmentName || 'N/A',
          days: leave.days,
          type: leave.type,
          requestedOn: leave.requestedOn,
          moderator: leave.moderator || 'N/A',
          updatedAt: leave.updatedAt,
        };
      })
    );

    return NextResponse.json(formattedLeaveData, { status: 200 });
  } catch (error) {
    console.error('Error fetching leave data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// import { PrismaClient } from '@prisma/client';
// import { NextRequest, NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   try {
//     const leaveData = await prisma.leave.findMany({
//       select: {
//         userName: true,
//         days: true,
//         type: true,
//         requestedOn: true,
//         moderator: true,
//         updatedAt: true,
//         userId: true, // Include userId to fetch the department
//       },
//     });

//     // Fetch department name for each leave
//     const formattedLeaveData = await Promise.all(
//       leaveData.map(async (leave) => {
//         const user = await prisma.user.findUnique({
//           where: { id: leave.userId },
//           select: { departmentName: true },
//         });

//         return {
//           userName: leave.userName,
//           department: user?.departmentName || 'N/A',
//           days: leave.days,
//           type: leave.type,
//           requestedOn: leave.requestedOn,
//           moderator: leave.moderator || 'N/A',
//           updatedAt: leave.updatedAt,
//         };
//       })
//     );

//     return NextResponse.json(formattedLeaveData, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching leave data:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// import { PrismaClient } from '@prisma/client';
// import { NextRequest, NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   try {
//     const leaveData = await prisma.leave.findMany({
//       select: {
//         userName: true,
//         days: true,
//         type: true,
//         requestedOn: true,
//         moderator: true,
//       },
//     });
//     return NextResponse.json(leaveData, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching leave data:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
