import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const departments = await prisma.department.findMany();
  return NextResponse.json(departments); 
}
