import Container from '@/components/Common/Container';
import TableWrapper from '@/components/Common/TableWrapper';
import ProfileTable from './ProfileTable';
// import { getAllUsers } from '@/lib/data/getUserData';
// import { User } from '@prisma/client';
import { getCurrentUser } from '@/lib/sessions/userSession';

export default async function RegularUsersPage() {
  const currentUser = await getCurrentUser();

  if (currentUser === null) {
    return <Container>Loading...</Container>;
  }

  const userArray = currentUser ? [currentUser] : [];

  return (
    <Container>
      <TableWrapper title='My Profile'>
        <ProfileTable user={userArray} />
      </TableWrapper>
    </Container>
  );
}
