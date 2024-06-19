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
          title: currentUser.titleName || ' ', // Default value if title is null
          department: currentUser.departmentName || ' ', // Default value if department is null
        },
      ]
    : [];

  return (
    // <div className='max-h-[40vh]'>
      <Container>
        <TableWrapper title='My Profile'>
          <ProfileTable user={userArray} />
        </TableWrapper>
      </Container>
    // </div>
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
