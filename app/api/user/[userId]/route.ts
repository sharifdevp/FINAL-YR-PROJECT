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
        // email: updatedUser.email,
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

// // Import necessary modules and functions
// import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';
// import { getCurrentUser } from '@/lib/sessions/session';
// import { Role } from '@prisma/client';

// // Define the PATCH request body structure
// type EditUserBody = {
//   phone: string;
//   departmentId: string;
//   titleId: string;
//   role: Role;
// };

// // Define the PATCH endpoint handler
// export async function PATCH(req: Request) {
//   const loggedInUser = await getCurrentUser();
//   if (loggedInUser?.role !== 'ADMIN') {
//     return NextResponse.json(
//       { error: 'You are not permitted to perform this action' },
//       { status: 403 }
//     );
//   }

//   try {
//     const { userId } = req.query; // Assuming userId is passed in the query params
//     const body: EditUserBody = await req.json();

//     const { phone, departmentId, titleId, role } = body;

//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         phone,
//         departmentId,
//         titleId,
//         role,
//       },
//       include: {
//         department: true, // Fetches department details
//         title: true, // Fetches title details
//       },
//     });

//     // Extract department name and title name
//     const departmentName =
//       updatedUser.department?.label ?? 'Department not found';
//     const titleName = updatedUser.title?.titlename ?? 'Title not found';

//     return NextResponse.json({
//       message: 'User updated successfully',
//       user: {
//         id: updatedUser.id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         phone: updatedUser.phone,
//         role: updatedUser.role,
//         department: departmentName,
//         title: titleName,
//       },
//     });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// import { getCurrentUser } from '@/lib/sessions/session';
// import { Role } from '@prisma/client';
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// type EditUserBody = {
//   phone: string;
//   departmentId: string;
//   id: string;
//   role: Role;
//   titleId: string;
// };

// export async function PATCH(req: Request) {
//   const loggedInUser = await getCurrentUser();
//   if (loggedInUser?.role !== 'ADMIN') {
//     return NextResponse.json(
//       { error: 'You are not permitted to perform this action' },
//       { status: 403 }
//     );
//   }

//   try {
//     const body: EditUserBody = await req.json();

//     console.log('Received request body:', body); // Log the request body for debugging

//     const { phone, departmentId, id, role, titleId } = body;

//     if (!id || !departmentId || !titleId) {
//       console.log('Missing fields:', { id, departmentId, titleId }); // Log missing fields for debugging
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     await prisma.user.update({
//       where: { id },
//       data: {
//         phone,
//         role,
//         titleId, //{ connect: { id: titleId } },
//         departmentId, //{ connect: { id: departmentId } },
//       },
//     });

//     return NextResponse.json({ message: 'Success' }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// import { getCurrentUser } from '@/lib/sessions/session';
// import { Role } from '@prisma/client';
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// type EditUserBody = {
//   phone: string;
//   department: string;
//   id: string;
//   role: Role;
//   titlename: string;
// };

// export async function PATCH(req: Request) {
//   const loggedInUser = await getCurrentUser();
//   if (loggedInUser?.role !== 'ADMIN') {
//     return NextResponse.json(
//       { error: 'You are not permitted to perform this action' },
//       { status: 403 }
//     );
//   }

//   try {
//     const body: EditUserBody = await req.json();

//     const { phone, department, id, role, titlename } = body;

//     await prisma.user.update({
//       where: { id },
//       data: {
//         phone,
//         role,
//         title: { connect: { id: titlename } }, // Correctly connect the title
//         department: { connect: { id: department } }, // If department is a relation
//       },
//     });

//     return NextResponse.json({ message: 'Success' }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// import { getCurrentUser } from '@/lib/sessions/session';
// import { Role } from '@prisma/client';
// import { NextResponse } from 'next/server';

// type EditUserBody = {
//   phone: string;
//   department: string;
//   id: string;
//   title: string;
//   role: Role;
// };

// export async function PATCH(req: Request) {
//   const loggedInUser = await getCurrentUser();
//   if (loggedInUser?.role !== 'ADMIN') {
//     throw new Error('You are not permitted to perfom this action');
//   }

//   try {
//     const body: EditUserBody = await req.json();

//     const { phone, department, id, role, title } = body;

//     await prisma.user.update({
//       where: { id },
//       data: { phone, department, role, title },
//     });

//     return NextResponse.json({ message: 'Success' }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
