import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Define interface for leave type
interface LeaveType {
  id: number;
  label: string;
  value: string;
  description: string;
}

interface LeaveTypesTableProps {
  leaveTypes: LeaveType[];
}

const LeaveTypesTable = ({ leaveTypes }: LeaveTypesTableProps) => (
  <div className='rounded-lg shadow-md px-6 max-h-[60vh] bg-white dark:bg-black ml-60 w-11/12'>
    {/* <div className='py-5 px-10 sticky top-0 z-10 shadow-md bg-white dark:bg-slate-900'>
      <h2 className='text-2xl text-center font-bold tracking-tight'>
        Available Leave Types
      </h2>
    </div> */}

    <div className='relative overflow-x-auto text-2xl '>
      <Table>
        <TableHeader className='whitespace-nowrap text-xl '>
          <TableRow>
            <TableHead> </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='whitespace-nowrap'>
          {leaveTypes.map((leaveType) => (
            <TableRow key={leaveType.id}>
              <TableCell className='font-medium px-2'>{leaveType.id}</TableCell>
              <TableCell className='font-medium'>{leaveType.label}</TableCell>
              <TableCell>{leaveType.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default LeaveTypesTable;

// 'use client';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { FaRegTrashAlt } from 'react-icons/fa';
// import { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// // import EditLeaveType from './EditLeaveType';
// import { leaveTypes } from '@/lib/dummy-data';

// const getLeaveTypes = async () => {
//   const res = await fetch('/api/leave-type', {
//     method: 'GET',
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch leave types');
//   }
//   const leaveTypes = await res.json();
//   return leaveTypes;
// };

// const LeaveTypesTable = () => {
//   const [leaveTypes, setLeaveTypes] = useState([]);

//   useEffect(() => {
//     const fetchLeaveTypes = async () => {
//       try {
//         const fetchedLeaveTypes = await getLeaveTypes();
//         setLeaveTypes(fetchedLeaveTypes);
//       } catch (error) {
//         toast.error('Failed to load leave types');
//       }
//     };

//     fetchLeaveTypes();
//   }, []);

//   const handleDelete = (id) => {
//     // Implement delete logic here
//     toast.error('Delete functionality not implemented');
//   };

//   return (
//     <div className='rounded-lg shadow-md px-6 max-h-[50vh] overflow-y-auto bg-white dark:bg-black'>
//       <div className='py-5 px-10 sticky top-0 z-10 shadow-md bg-white dark:bg-slate-900'>
//         <h2 className='text-2xl text-center font-bold tracking-tight'>
//           Available Leave Types
//         </h2>
//       </div>

//       <div className='relative overflow-x-auto'>
//         <Table>
//           <TableHeader className='whitespace-nowrap'>
//             <TableRow>
//               <TableHead>Title</TableHead>
//               <TableHead>Description</TableHead>
//               <TableHead>Edit</TableHead>
//               <TableHead>Delete</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody className='whitespace-nowrap'>
//             {leaveTypes.map((leaveType) => (
//               <TableRow key={leaveType.id}>
//                 <TableCell className='font-medium'>{leaveType.value}</TableCell>
//                 <TableCell>{leaveType.description}</TableCell>
//                 <TableCell>
//                   <button>
//                     {/* <EditLeaveType leaveType={leaveType} /> */}
//                   </button>
//                 </TableCell>
//                 <TableCell>
//                   <button onClick={() => handleDelete(leaveType.id)}>
//                     <FaRegTrashAlt size={18} />
//                   </button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default LeaveTypesTable;

// // 'use client';

// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from '@/components/ui/table';
// // import { LeaveType } from '@prisma/client';
// // import { FaRegTrashAlt } from 'react-icons/fa';
// // import { useState, useEffect } from 'react';
// // import toast from 'react-hot-toast';
// // import EditLeaveType from './EditLeaveType';

// // const getLeaveTypes = async () => {
// //   const res = await fetch('/api/leave-type', {
// //     method: 'GET',
// //   });

// //   if (!res.ok) {
// //     throw new Error('Failed to fetch leave types');
// //   }
// //   const leaveTypes = await res.json();
// //   return leaveTypes;
// // };

// // const LeaveTypesTable = () => {
// //   const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);

// //   useEffect(() => {
// //     const fetchLeaveTypes = async () => {
// //       try {
// //         const fetchedLeaveTypes = await getLeaveTypes();
// //         setLeaveTypes(fetchedLeaveTypes);
// //       } catch (error) {
// //         toast.error('Failed to load leave types');
// //       }
// //     };

// //     fetchLeaveTypes();
// //   }, []);

// //   return (
// //     <div className='rounded-lg shadow-md px-6 max-h-[50vh] overflow-y-auto bg-white dark:bg-black'>
// //       <div className='py-5 px-10 sticky top-0 z-10 shadow-md bg-white dark:bg-slate-900'>
// //         <h2 className='text-2xl text-center font-bold tracking-tight'>
// //           Available Leave Types
// //         </h2>
// //       </div>

// //       <div className='relative overflow-x-auto'>
// //         <Table>
// //           <TableHeader className='whitespace-nowrap'>
// //             <TableRow>
// //               <TableHead>Title</TableHead>
// //               <TableHead>Description</TableHead>
// //               <TableHead>Edit</TableHead>
// //               <TableHead>Delete</TableHead>
// //             </TableRow>
// //           </TableHeader>
// //           <TableBody className='whitespace-nowrap'>
// //             {leaveTypes.map((leaveType) => (
// //               <TableRow key={leaveType.id}>
// //                 <TableCell className='font-medium'>{leaveType.title}</TableCell>
// //                 <TableCell>{leaveType.description}</TableCell>
// //                 <TableCell>
// //                   <button>
// //                     {/* <EditLeaveType leaveType={leaveType} /> */}
// //                   </button>
// //                 </TableCell>
// //                 <TableCell>
// //                   <button onClick={() => handleDelete(leaveType.id)}>
// //                     <FaRegTrashAlt size={18} />
// //                   </button>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LeaveTypesTable;
