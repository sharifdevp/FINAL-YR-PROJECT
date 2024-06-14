import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// import { getCurrentUser } from '@/lib/sessions/userSession';

export async function GET(req: NextRequest) {
  const leaveType = await prisma.leaveType.findMany();
  return NextResponse.json(leaveType);
}
