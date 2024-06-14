import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/sessions/userSession';

type SubmittedEvent = {
  title: string;
  description: string;
  startDate: string;
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
    const body: SubmittedEvent = await req.json();

    const { title, description, startDate } = body;
    await prisma.events.create({
      data: {
        startDate,
        title,
        description,
      },
    });

    return NextResponse.json(
      { message: 'Event created successfully' },
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

export async function DELETE(req: NextRequest) {
  const eventId = req.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL

  if (!eventId) {
    return NextResponse.json(
      { error: 'Event ID is required' },
      { status: 400 }
    );
  }

  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'You are not permitted to perform this action' },
      { status: 403 }
    );
  }

  try {
    await prisma.events.delete({
      where: { id: eventId },
    });

    return NextResponse.json(
      { message: 'Event deleted successfully' },
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
