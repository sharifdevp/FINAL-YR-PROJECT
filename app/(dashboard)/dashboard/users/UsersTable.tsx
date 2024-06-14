// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { User } from '@prisma/client';
// import AddCredits from './AddCredits';
// import EditUser from './EditUser';

// type UserProps = {
//   users: User[];
// };

// const UsersTable = ({ users }: UserProps) => {
//   return (
//     <Table>
//       <TableHeader className='whitespace-nowrap'>
//         <TableRow>
//           <TableHead>Profile image/avatar</TableHead>
//           <TableHead>User Name</TableHead>
//           <TableHead>Email</TableHead>
//           <TableHead>Phone</TableHead>
//           <TableHead>Department</TableHead>
//           <TableHead>Job Title</TableHead>
//           <TableHead>Role</TableHead>
//           <TableHead className=''>Edit</TableHead>
//           <TableHead className=''>Add Leave Credits</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody className='whitespace-nowrap'>
//         {users.map((user) => {
//           {
//             /* console.log('User Image:', user.image); // Debug log for user image */
//           }
//           return (
//             <TableRow key={user.id}>
//               <TableCell className='font-medium'>
//                 <Avatar className='w-16 h-16'>
//                   <AvatarImage
//                     src={user.image ? user.image : '/fallback-image.jpg'} // Ensure there is a fallback image
//                     alt={user.name || 'User Avatar'}
//                   />
//                   <AvatarFallback>
//                     {user.name?.charAt(0).toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//               </TableCell>
//               <TableCell className='font-medium'>{user.name}</TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>{user.phone}</TableCell>
//               <TableCell>
//                 <Badge variant='outline'>{user.departmentId}</Badge>
//               </TableCell>
//               <TableCell className=''>
//                 <Badge variant='secondary'>{user.titleId}</Badge>
//               </TableCell>
//               <TableCell className=''>{user.role}</TableCell>
//               <TableCell className='text-right'>
//                 <EditUser user={user} />
//               </TableCell>
//               <TableCell className='text-right'>
//                 <AddCredits
//                   email={user.email as string}
//                   name={user.name as string}
//                 />
//               </TableCell>
//             </TableRow>
//           );
//         })}
//       </TableBody>
//     </Table>
//   );
// };

// export default UsersTable;

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@prisma/client';
import EditUser from './EditUser';
import AddCredits from './AddCredits';

type UserProps = {
  users: User[];
};

const UsersTable = ({ users }: UserProps) => {
  const [usersList, setUsersList] = useState(users);

  // Function to update a user in the local state
  const updateUser = (updatedUser: User) => {
    const updatedUsers = usersList.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsersList(updatedUsers);
  };

  return (
    <Table>
      <TableHeader className='whitespace-nowrap'>
        <TableRow>
          <TableHead>Profile image/avatar</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className=''>Edit</TableHead>
          <TableHead className=''>Add Leave Credits</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='whitespace-nowrap'>
        {usersList.map((user) => (
          <TableRow key={user.id}>
            <TableCell className='font-medium'>
              <Avatar className='w-16 h-16'>
                <AvatarImage
                  src={user.image ? user.image : '/fallback-image.jpg'}
                  alt={user.name || 'User Avatar'}
                />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className='font-medium'>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>
              <Badge variant='outline'>{user.departmentName}</Badge>
            </TableCell>
            <TableCell className=''>
              <Badge variant='secondary'>{user.titleName}</Badge>
            </TableCell>
            <TableCell className=''>{user.role}</TableCell>
            <TableCell className='text-right'>
              <EditUser user={user} onUpdate={updateUser} />
            </TableCell>
            <TableCell className='text-right'>
              <AddCredits
                email={user.email as string}
                name={user.name as string}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
