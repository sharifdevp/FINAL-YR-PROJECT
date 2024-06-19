import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/sessions/userSession';

type SubmittedDepartment = {
  label: string;
  desc: string;
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
    const body: SubmittedDepartment = await req.json();
    const { label, desc } = body;

    const newDepartment = await prisma.department.create({
      data: {
        label,
        desc,
        // userId: loggedInUser.id, // Assuming we want to associate the department with the logged-in user
      },
    });

    return NextResponse.json(newDepartment, { status: 201 });
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

    await prisma.department.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'department deleted successfully' },
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

    const existingDepartment = await prisma.department.findUnique({
      where: { id },
    });

    if (!existingDepartment) {
      return NextResponse.json(
        { error: 'Department not found' },
        { status: 404 }
      );
    }

    const body: SubmittedDepartment = await req.json();

    const { label, desc } = body;

    await prisma.department.update({
      where: { id },
      data: {
        label,
        desc,
      },
    });

    return NextResponse.json(
      { message: 'Department edited successfully' },
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
