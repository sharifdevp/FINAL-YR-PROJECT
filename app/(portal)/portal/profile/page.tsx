import Container from '@/components/Common/Container';
import TableWrapper from '@/components/Common/TableWrapper';
import ProfileTable from './ProfileTable';
import { getCurrentUser } from '@/lib/sessions/userSession';

export default async function RegularUsersPage() {
  const currentUser = await getCurrentUser();

  if (currentUser === null) {
    return <Container>Loading...</Container>;
  }

  // Ensure currentUser includes title and department
  const userArray = currentUser
    ? [
        {
          ...currentUser,
          title: currentUser.titleName || 'Unknown Title', // Default value if title is null
          department: currentUser.departmentName || 'Unknown Department', // Default value if department is null
        },
      ]
    : [];

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
