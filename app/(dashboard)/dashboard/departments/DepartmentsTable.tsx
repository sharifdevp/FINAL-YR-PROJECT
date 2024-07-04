'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Department } from '@prisma/client';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import EditDepartment from './EditDepartment';

// Fetch departments data from the API
const getDepartments = async () => {
  const res = await fetch('/api/department', {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch departments');
  }
  const departments = await res.json();
  return departments;
};

const DepartmentsTable = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const fetchedDepartments = await getDepartments();
        setDepartments(fetchedDepartments);
      } catch (error) {
        toast.error('Failed to load departments');
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/department/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDepartments(
          departments.filter((department) => department.id !== id)
        );
        toast.success('Department Deleted', { duration: 15000 });
      } else {
        const errorMessage = await res.text();
        toast.error(`An error occurred: ${errorMessage}`, { duration: 15000 });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An Unexpected error occurred');
    }
  };

  const formatText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return (
      <>
        {words.slice(0, wordLimit).join(' ')}
        {words.length > wordLimit && (
          <>
            <br />
            {words.slice(wordLimit).join(' ')}
          </>
        )}
      </>
    );
  };

  return (
    <div className='rounded-lg shadow-md px-6 max-h-[68vh] overflow-y-auto bg-white dark:bg-black'>
      <div className='py-5 px-10 sticky top-0 z-10 shadow-md bg-white dark:bg-slate-900'>
        <h2 className='text-2xl text-center font-bold tracking-tight'>
          Available Departments
        </h2>
      </div>

      <div className='relative overflow-x-auto'>
        <Table>
          <TableHeader className='whitespace-nowrap'>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='whitespace-nowrap'>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className='font-medium break-words max-w-xs whitespace-pre-wrap'>
                  {formatText(department.label, 3)}
                </TableCell>
                <TableCell className='break-words max-w-xs whitespace-pre-wrap'>
                  {formatText(department.desc, 9)}
                </TableCell>
                <TableCell>
                  <button>
                    <EditDepartment
                      id={department.id}
                      label={department.label}
                      desc={department.desc}
                    />
                  </button>
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(department.id)}>
                    <FaRegTrashAlt size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentsTable;

// 'use client';

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Department } from '@prisma/client';
// import { FaRegTrashAlt } from 'react-icons/fa';
// import { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
// import EditDepartment from './EditDepartment';

// // Fetch departments data from the API
// const getDepartments = async () => {
//   const res = await fetch('/api/department', {
//     method: 'GET',
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch departments');
//   }
//   const departments = await res.json();
//   return departments;
// };

// const DepartmentsTable = () => {
//   const [departments, setDepartments] = useState<Department[]>([]);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const fetchedDepartments = await getDepartments();
//         setDepartments(fetchedDepartments);
//       } catch (error) {
//         toast.error('Failed to load departments');
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       const res = await fetch(`/api/department/${id}`, {
//         method: 'DELETE',
//       });
//       if (res.ok) {
//         setDepartments(
//           departments.filter((department) => department.id !== id)
//         );
//         toast.success('Department Deleted', { duration: 15000 });
//       } else {
//         const errorMessage = await res.text();
//         toast.error(`An error occurred: ${errorMessage}`, { duration: 15000 });
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//       toast.error('An Unexpected error occurred');
//     }
//   };

//   return (
//     <div className='rounded-lg shadow-md px-6 max-h-[68vh] overflow-y-auto bg-white dark:bg-black'>
//       <div className='py-5 px-10 sticky top-0 z-10 shadow-md bg-white dark:bg-slate-900'>
//         <h2 className='text-2xl text-center font-bold tracking-tight'>
//           Available Departments
//         </h2>
//       </div>

//       <div className='relative overflow-x-auto'>
//         <Table>
//           <TableHeader className='whitespace-nowrap'>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Description</TableHead>
//               <TableHead>Edit</TableHead>
//               <TableHead>Delete</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody className='whitespace-nowrap'>
//             {departments.map((department) => (
//               <TableRow key={department.id}>
//                 <TableCell className='font-medium'>
//                   {department.label}
//                 </TableCell>
//                 <TableCell>{department.desc}</TableCell>
//                 <TableCell>
//                   <button>
//                     <EditDepartment
//                       id={department.id}
//                       label={department.label}
//                       desc={department.desc}
//                     />
//                   </button>
//                 </TableCell>
//                 <TableCell>
//                   <button onClick={() => handleDelete(department.id)}>
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

// export default DepartmentsTable;
