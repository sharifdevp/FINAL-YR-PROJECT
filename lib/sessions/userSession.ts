import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/sessions/session';
import { Role } from '@prisma/client';

// Define the PATCH request body structure
type EditUserBody = {
  phone: string;
  departmentId: string;
  titleId: string;
  role: Role;
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'You are not permitted to perform this action' },
      { status: 403 }
    );
  }

  try {
    const { userId } = params; // Access userId from route parameters
    const body: EditUserBody = await req.json(); // Parse the request body

    const { phone, departmentId, titleId, role } = body;

    // Fetch department and title details
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
    });
    const title = await prisma.orgnTitle.findUnique({ where: { id: titleId } });

    if (!department) {
      return NextResponse.json(
        { error: 'Department not found' },
        { status: 404 }
      );
    }

    if (!title) {
      return NextResponse.json({ error: 'Title not found' }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        phone,
        departmentId,
        titleId,
        role,
        departmentName: department.label, // Assuming departmentName is a field in the User model
        titleName: title.titlename, // Assuming titleName is a field in the User model
      },
    });

    return NextResponse.json({
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        departmentName: department.label,
        titleName: title.titlename,
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth';
// import { Role } from '@prisma/client';
// import prisma from '@/lib/prisma';

// export async function getCurrentUser(): Promise<{
//   id: string;
//   name: string | null;
//   email: string | null;
//   emailVerified: Date | null;
//   image: string | null;
//   role: Role;
//   phone: string | null;
//   titleName: string | null;
//   manager: string | null;
//   label: string | null;
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
//   };
// }
