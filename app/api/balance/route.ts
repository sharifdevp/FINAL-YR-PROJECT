import { getCurrentUser } from '@/lib/sessions/session';
import { Role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type SubmittedCredits = {
  annual: number;
  sick: number;
  maternity: number;
  paternity: number;
  emergency: number;
  compensation: number;
  unpaid: number;
  email: string;
  year: string;
  name: string;
};

const allowedRoles = ['ADMIN', 'MODERATOR'];

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (!allowedRoles.includes(loggedInUser?.role as Role)) {
    throw new Error('You are not permitted to perform this action');
  }
  try {
    const body: SubmittedCredits = await req.json();

    const {
      annual,
      sick,
      maternity,
      paternity,
      emergency,
      compensation,
      unpaid,
      year,
      email,
      name,
    } = body;

    const existingCredits = await prisma.balances.findFirst({
      where: {
        year,
        email,
      },
    });

    if (existingCredits) {
      return NextResponse.json(
        'Credits for the current period already exists',
        { status: 400 }
      );
    }

    await prisma.balances.create({
      data: {
        name,
        email,
        year,
        annualCredit: annual,
        sickCredit: sick,
        maternityCredit: maternity,
        paternityCredit: paternity,
        emergencyCredit: emergency,
        compensationCredit: compensation,
        unpaidCredit: unpaid,
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
