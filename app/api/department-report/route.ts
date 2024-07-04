import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Fetch leave data grouped by department and status
    const leaves = await prisma.leave.findMany({
      select: {
        status: true,
        user: {
          select: {
            department: true,
          },
        },
      },
    });

    // Fetch total employees in each department
    const employees = await prisma.user.findMany({
      select: {
        department: {
          select: {
            label: true,
          },
        },
      },
    });

    // Log the raw data from the database
    console.log('Raw leave data:', leaves);
    console.log('Raw employee data:', employees);

    const departmentReportData = leaves.reduce((acc, leave) => {
      const departmentName = leave.user.department?.label || 'Unknown';

      if (!acc[departmentName]) {
        acc[departmentName] = {
          departmentName,
          totalLeaves: 0,
          pendingLeaves: 0,
          approvedLeaves: 0,
          rejectedLeaves: 0,
          totalEmployees: 0, // Initialize total employees
        };
      }

      acc[departmentName].totalLeaves++;

      switch (leave.status) {
        case 'PENDING':
          acc[departmentName].pendingLeaves++;
          break;
        case 'APPROVED':
          acc[departmentName].approvedLeaves++;
          break;
        case 'REJECTED':
          acc[departmentName].rejectedLeaves++;
          break;
        default:
          break;
      }

      return acc;
    }, {} as Record<string, { departmentName: string; totalLeaves: number; pendingLeaves: number; approvedLeaves: number; rejectedLeaves: number; totalEmployees: number }>);

    // Count total employees in each department
    employees.forEach(employee => {
      const departmentName = employee.department?.label || 'Unknown';

      if (!departmentReportData[departmentName]) {
        departmentReportData[departmentName] = {
          departmentName,
          totalLeaves: 0,
          pendingLeaves: 0,
          approvedLeaves: 0,
          rejectedLeaves: 0,
          totalEmployees: 0,
        };
      }

      departmentReportData[departmentName].totalEmployees++;
    });

    // Convert the aggregated data to an array format for easy consumption
    const result = Object.values(departmentReportData);

    // Log the formatted data
    console.log('Formatted department report data:', result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching department leave report data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


// import { PrismaClient } from '@prisma/client';
// import { NextRequest, NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   try {
//     // Fetch leave data grouped by department and status
//     const leaves = await prisma.leave.findMany({
//       select: {
//         status: true,
//         user: {
//           select: {
//             department: true,
//           },
//         },
//       },
//     });

//     // Log the raw data from the database
//     console.log('Raw leave data:', leaves);

//     const departmentReportData = leaves.reduce((acc, leave) => {
//       const departmentName = leave.user.department.label || 'Unknown';

//       if (!acc[departmentName]) {
//         acc[departmentName] = {
//           departmentName,
//           totalLeaves: 0,
//           pendingLeaves: 0,
//           approvedLeaves: 0,
//           rejectedLeaves: 0,
//         };
//       }

//       acc[departmentName].totalLeaves++;

//       switch (leave.status) {
//         case 'PENDING':
//           acc[departmentName].pendingLeaves++;
//           break;
//         case 'APPROVED':
//           acc[departmentName].approvedLeaves++;
//           break;
//         case 'REJECTED':
//           acc[departmentName].rejectedLeaves++;
//           break;
//         default:
//           break;
//       }

//       return acc;
//     }, {} as Record<string, { departmentName: string; totalLeaves: number; pendingLeaves: number; approvedLeaves: number; rejectedLeaves: number }>);

//     // Convert the aggregated data to an array format for easy consumption
//     const result = Object.values(departmentReportData);

//     // Log the formatted data
//     console.log('Formatted department report data:', result);

//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching department leave report data:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }







// import { PrismaClient } from '@prisma/client';
// import { NextRequest, NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   try {
//     // Fetch leave data grouped by department and status
//     const leaves = await prisma.leave.findMany({
//       select: {
//         status: true,
//         user: {
//           select: {
//             departmentName: true,
//           },
//         },
//       },
//     });

//     // Log the raw data from the database
//     console.log('Raw leave data:', leaves);

//     const departmentReportData = leaves.reduce((acc, leave) => {
//       const departmentName = leave.user.departmentName || 'Unknown';

//       if (!acc[departmentName]) {
//         acc[departmentName] = {
//           departmentName,
//           totalLeaves: 0,
//           pendingLeaves: 0,
//           approvedLeaves: 0,
//           rejectedLeaves: 0,
//         };
//       }

//       acc[departmentName].totalLeaves++;

//       switch (leave.status) {
//         case 'PENDING':
//           acc[departmentName].pendingLeaves++;
//           break;
//         case 'APPROVED':
//           acc[departmentName].approvedLeaves++;
//           break;
//         case 'REJECTED':
//           acc[departmentName].rejectedLeaves++;
//           break;
//         default:
//           break;
//       }

//       return acc;
//     }, {} as Record<string, { departmentName: string; totalLeaves: number; pendingLeaves: number; approvedLeaves: number; rejectedLeaves: number }>);

//     // Convert the aggregated data to an array format for easy consumption
//     const result = Object.values(departmentReportData);

//     // Log the formatted data
//     console.log('Formatted department report data:', result);

//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching department leave report data:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }




