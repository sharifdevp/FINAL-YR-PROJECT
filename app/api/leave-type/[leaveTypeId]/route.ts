import { getCurrentUser } from '@/lib/sessions/userSession';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type SubmittedLeaveType = {
  title: string;
  description: string;
};

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'You are not permitted to perform this action' },
      { status: 403 }
    );
  }

  try {
    const body: SubmittedLeaveType = await req.json();

    const { title, description } = body;

    // Automatically set the category as the lower case version of the title
    const category = title.toLowerCase();

    const newLeavetype = await prisma.leaveType.create({
      data: {
        title,
        category,
        description,
      },
    });

    return NextResponse.json(newLeavetype, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'You are not permitted to perform this action' },
      { status: 403 }
    );
  }

  try {
    const id = req.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL

    if (!id) {
      return NextResponse.json(
        { error: 'Invalid request, ID is missing' },
        { status: 400 }
      );
    }

    await prisma.leaveType.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Leave type deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'You are not permitted to perform this action' },
      { status: 403 }
    );
  }

  try {
    const id = req.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL

    if (!id) {
      return NextResponse.json(
        { error: 'Invalid request, ID is missing' },
        { status: 400 }
      );
    }

    const existingLeaveType = await prisma.leaveType.findUnique({
      where: { id },
    });

    if (!existingLeaveType) {
      return NextResponse.json(
        { error: 'Leave type not found' },
        { status: 404 }
      );
    }

    const body: SubmittedLeaveType = await req.json();

    const { title, description } = body;

    // Automatically set the category as the lower case version of the title
    const category = title.toLowerCase();

    await prisma.leaveType.update({
      where: { id },
      data: {
        title,
        category,
        description,
      },
    });

    return NextResponse.json(
      { message: 'Leave type updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
