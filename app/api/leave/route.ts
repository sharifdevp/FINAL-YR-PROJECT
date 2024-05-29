import { getCurrentUser } from '@/lib/session';
import { differenceInDays, parseISO } from 'date-fns';
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
        { error: 'Leave entry already exists' },
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

    const year = new Date().getFullYear().toString();
    await prisma.leave.create({
      data: {
        startDate,
        endDate,
        userEmail: user.email,
        type: leave,
        userNote: notes,
        fileContent, // Store the file content in the database
        userName: user.name,
        days: calcDays,
        year,
      },
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
