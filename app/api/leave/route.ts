import { getCurrentUser } from '@/lib/sessions/session';
import { differenceInDays, parseISO, isBefore } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Corrected import statement

type SubmittedLeave = {
  notes: string;
  leave: string;
  startDate: string;
  endDate: string;
  user: {
    email: string;
    image: string;
    name: string;
    role: string;
  };
};

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return NextResponse.error();
  }

  try {
    const formData = await req.formData();
    const body: SubmittedLeave = JSON.parse(formData.get('data') as string);

    const { startDate, endDate, leave, notes, user } = body;

    const startDateObj = parseISO(startDate);
    const endDateObj = parseISO(endDate);

    // Validate start and end dates
    if (isBefore(startDateObj, new Date())) {
      return NextResponse.json(
        { styledError: 'Start date cannot be in the past.' },
        { status: 400 }
      );
    }

    if (isBefore(endDateObj, startDateObj)) {
      return NextResponse.json(
        { styledError: 'End date cannot be before the start date.' },
        { status: 400 }
      );
    }

    const calcDays = differenceInDays(endDateObj, startDateObj) + 1;

    const existingLeave = await prisma.leave.findFirst({
      where: {
        startDate,
        endDate,
        userEmail: user.email,
      },
    });

    if (existingLeave) {
      return NextResponse.json(
        { styledError: 'Leave entry already exists' },
        { status: 400 }
      );
    }

    let fileContent: Buffer | undefined;
    const file = formData.get('file') as File;
    if (file) {
      // Convert the file to a Buffer
      const bytes = await file.arrayBuffer();
      fileContent = Buffer.from(bytes);
    }

    // Retrieve the user from the database to get their ID and phone number
    const dbUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!dbUser) {
      return NextResponse.json(
        { styledError: 'User not found' },
        { status: 404 }
      );
    }

    if (!dbUser.phone) {
      return NextResponse.json(
        {
          message: ' Phone number required on your profile',
        },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear().toString();
    await prisma.leave.create({
      data: {
        startDate,
        endDate,
        userId: dbUser.id, // Use the user's ID here
        type: leave,
        userNote: notes,
        fileContent, // Store the file in the database
        userName: user.name,
        days: calcDays,
        year,
        userEmail: user.email, // Include userEmail property
        phoneNumber: dbUser.phone, // Using phone number from the database
      },
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { styledError: 'Internal server error' },
      { status: 500 }
    );
  }
}

// import { getCurrentUser } from '@/lib/sessions/session';
// import { differenceInDays, parseISO } from 'date-fns';
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma'; // Corrected import statement

// type SubmittedLeave = {
//   notes: string;
//   leave: string;
//   startDate: string;
//   endDate: string;
//   user: {
//     email: string;
//     image: string;
//     name: string;
//     role: string;
//   };
// };

// export async function POST(req: NextRequest) {
//   const loggedInUser = await getCurrentUser();
//   if (!loggedInUser) {
//     return NextResponse.error();
//   }

//   try {
//     const formData = await req.formData();
//     const body: SubmittedLeave = JSON.parse(formData.get('data') as string);

//     const { startDate, endDate, leave, notes, user } = body;

//     const startDateObj = parseISO(startDate);
//     const endDateObj = parseISO(endDate);
//     const calcDays = differenceInDays(endDateObj, startDateObj) + 1;

//     const existingLeave = await prisma.leave.findFirst({
//       where: {
//         startDate,
//         endDate,
//         userEmail: user.email,
//       },
//     });

//     if (existingLeave) {
//       return NextResponse.json(
//         { styledError: 'Leave entry already exists' },
//         { status: 400 }
//       );
//     }

//     let fileContent: Buffer | undefined;
//     const file = formData.get('file') as File;
//     if (file) {
//       // Convert the file to a Buffer
//       const bytes = await file.arrayBuffer();
//       fileContent = Buffer.from(bytes);
//     }

//     // Retrieve the user from the database to get their ID and phone number
//     const dbUser = await prisma.user.findUnique({
//       where: {
//         email: user.email,
//       },
//     });
//     if (!dbUser) {
//       return NextResponse.json(
//         { styledError: 'User not found' },
//         { status: 404 }
//       );
//     }

//     if (!dbUser.phone) {
//       return NextResponse.json(
//         {
//           message: ' Phone number required on your profile',
//         },
//         { status: 400 }
//       );
//     }

//     const year = new Date().getFullYear().toString();
//     await prisma.leave.create({
//       data: {
//         startDate,
//         endDate,
//         userId: dbUser.id, // Use the user's ID here
//         type: leave,
//         userNote: notes,
//         fileContent, // Store the file in the database
//         userName: user.name,
//         days: calcDays,
//         year,
//         userEmail: user.email, // Include userEmail property
//         phoneNumber: dbUser.phone, // Use phone number from the database
//       },
//     });

//     return NextResponse.json({ message: 'Success' }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { styledError: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
