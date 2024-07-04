//For Admin user

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}


// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth';
// import { Role } from '@prisma/client';
// import prisma from '@/lib/prisma';

// export async function getCurrentUser(): Promise<{
//   birthName: string | null;
//   departmentId: string;
//   manager: string;
//   titleId: string;
//   id: string;
//   name: string | null;
//   email: string | null;
//   emailVerified: Date | null;
//   image: string | null;
//   role: Role;
//   phone: string | null;
//   titleName: string | null;
//   departmentName: string | null;

//   // manager: string | null;
//   // label: string | null;
// } | null> {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user?.email) {
//     return null;
//   }

//   // Retrieve the full user details from the database
//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//     include: {
//       department: true, // Include department if relation is set up
//       title: true, // Include title relation
//     },
//   });

//   if (!user) {
//     return null;
//   }

//   return {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     emailVerified: user.emailVerified,
//     image: user.image,
//     role: user.role,
//     phone: user.phone,
//     titleName: user.title?.titlename || null, // Access title name through the relation
//     departmentName: user.department?.label || null,
//     birthName: user.birthName,
//     departmentId: user.department.id,
//     titleId: user.title.id,
//     manager: user.manager,
//   };
// }:
