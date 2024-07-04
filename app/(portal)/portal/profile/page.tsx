import Container from '@/components/Common/Container';
import TableWrapper from '@/components/Common/TableWrapper';
import ProfileTable from './ProfileTable';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/sessions/session';

async function fetchUserDetails(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      department: true, // Include department if relation is set up
      title: true, // Include title relation
    },
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
    titleName: user.title?.titlename || null, // Access title name through the relation
    departmentName: user.department?.label || null,
    birthName: user.birthName,
    departmentId: user.department?.id || null, // Check for null
    titleId: user.title?.id || null, // Check for null
    manager: user.manager || null,
  };
}

export default async function RegularUsersPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.email) {
    return <Container>Loading...</Container>;
  }

  const userDetails = await fetchUserDetails(currentUser.email);

  if (!userDetails) {
    return <Container>Loading...</Container>;
  }

  const userArray = [
    {
      ...userDetails,
      title: userDetails.titleName || ' ', // Default value if title is null
      department: userDetails.departmentName || '  ', // Default value if department is null
    },
  ];

  return (
    <Container>
      <TableWrapper title='My Profile'>
        <ProfileTable user={userArray} />
      </TableWrapper>
    </Container>
  );
}

// import Container from '@/components/Common/Container';
// import TableWrapper from '@/components/Common/TableWrapper';
// import ProfileTable from './ProfileTable';
// import { getCurrentUser } from '@/lib/sessions/session';

// export default async function RegularUsersPage() {
//   const currentUser = await getCurrentUser();

//   if (currentUser === null) {
//     return <Container>Loading...</Container>;
//   }

//   // Ensure currentUser includes title and department
//   const userArray = currentUser
//     ? [
//         {
//           ...currentUser,
//           title: currentUser.titleName || ' ', // Default value if title is null
//           department: currentUser.departmentName || '  ', // Default value if department is null
//         },
//       ] 
//     : [];

//   return (
//     <Container>
//       <TableWrapper title='My Profile'>
//         <ProfileTable user={userArray} />
//       </TableWrapper>
//     </Container>
//   );
// }

// import Container from '@/components/Common/Container';
// import TableWrapper from '@/components/Common/TableWrapper';
// import ProfileTable from './ProfileTable';
// import { getCurrentUser } from '@/lib/sessions/userSession';

// export default async function RegularUsersPage() {
//   const currentUser = await getCurrentUser();

//   if (currentUser === null) {
//     return <Container>Loading...</Container>;
//   }

//   const userArray = currentUser ? [currentUser] : [];

//   return (
//     <Container>
//       <TableWrapper title='My Profile'>
//         <ProfileTable user={userArray} />
//       </TableWrapper>
//     </Container>
//   );
// }
