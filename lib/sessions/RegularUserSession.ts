import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth';
import { Role, User } from '@prisma/client';
import prisma from '@/lib/prisma'; // Adjust this import to your actual prisma instance path

export async function getCurrentUser(): Promise<{
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: Role;
  phone: string | null;
  title: string | null;
  manager: string | null;
  department: string | null;
} | null> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return null;
  }

  // Retrieve the full user details from the database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    role: user.role,
    phone: user.phone,
    title: user.title,
    manager: user.manager,
    department: user.department,
  };
}
