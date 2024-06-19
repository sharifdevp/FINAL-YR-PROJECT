import { getCurrentUser } from '@/lib/sessions/session';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type SubmittedOrgnTitle = {
  titlename: string;
  description: string;
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
    const body: SubmittedOrgnTitle = await req.json();
    const { titlename, description } = body;

    const newOrgnTitle = await prisma.orgnTitle.create({
      data: {
        titlename,
        description,
      },
    });

    return NextResponse.json(newOrgnTitle, { status: 201 });
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

    await prisma.orgnTitle.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Organisation Title deleted' },
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

    const existingOrgnTitle = await prisma.orgnTitle.findUnique({
      where: { id },
    });

    if (!existingOrgnTitle) {
      return NextResponse.json(
        { error: 'Organisation Title not found' },
        { status: 404 }
      );
    }

    const body: SubmittedOrgnTitle = await req.json();
    const { titlename, description } = body;

    await prisma.orgnTitle.update({
      where: { id },
      data: {
        titlename,
        description,
      },
    });

    return NextResponse.json(
      { message: 'Organisation Title updated' },
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



// import { getCurrentUser } from '@/lib/sessions/userSession';
// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// type SubmittedOrgnTitle = {
//   titlename: string;
//   description: string;
// };

// export async function POST(req: NextRequest) {
//   const loggedInUser = await getCurrentUser();
//   if (loggedInUser?.role !== 'ADMIN') {
//     return NextResponse.json(
//       { error: 'You are not permitted to perform this action' },
//       { status: 403 }
//     );
//   }

//   try {
//     const body: SubmittedOrgnTitle = await req.json();

//     const { titlename, description } = body;

//     return NextResponse.json({ message: 'Success' }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req: NextRequest) {
//   const loggedInUser = await getCurrentUser();
//   if (loggedInUser?.role !== 'ADMIN') {
//     return NextResponse.json(
//       { error: 'You are not permitted to perform this action' },
//       { status: 403 }
//     );
//   }

//   try {
//     const id = req.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL

//     if (!id) {
//       return NextResponse.json(
//         { error: 'Invalid request, ID is missing' },
//         { status: 400 }
//       );
//     }

//     await prisma.orgnTitle.delete({
//       where: { id },
//     });

//     return NextResponse.json(
//       { message: 'Organisation Title deleted successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(req: NextRequest) {
//   const loggedInUser = await getCurrentUser();
//   if (loggedInUser?.role !== 'ADMIN') {
//     return NextResponse.json(
//       { error: 'You are not permitted to perform this action' },
//       { status: 403 }
//     );
//   }

//   try {
//     const id = req.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL

//     if (!id) {
//       return NextResponse.json(
//         { error: 'Invalid request, ID is missing' },
//         { status: 400 }
//       );
//     }

//     const existingOrgnTitle = await prisma.orgnTitle.findUnique({
//       where: { id },
//     });

//     if (!existingOrgnTitle) {
//       return NextResponse.json(
//         { error: 'Organisation Title not found' },
//         { status: 404 }
//       );
//     }

//     const body: SubmittedOrgnTitle = await req.json();

//     const { titlename, description } = body;

//     await prisma.orgnTitle.update({
//       where: { id },
//       data: {
//         titlename,
//         description,
//       },
//     });

//     return NextResponse.json(
//       { message: 'Leave type updated successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
