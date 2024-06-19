import { getCurrentUser } from '@/lib/sessions/userSession';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type EditProfileBody = {
  phone: string;
  birthName: string;
  id: string;
  image: string; // Added image field
};

export async function PATCH(req: Request) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== 'USER') {
    throw new Error('You are not permitted to perform this action');
  }

  try {
    const body: EditProfileBody = await req.json();
    const { phone,birthName, id, image } = body;

    await prisma.user.update({
      where: { id },
      data: { phone, birthName, image }, // Updating these fields in the db
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
