import { leaveTypes as dummyLeaveTypes } from '@/lib/dummy-data';
import Container from '@/components/Common/Container';
import LeaveTypesTable from './leaveTypesTable';

// Define interface for leave type
interface LeaveType {
  id: number;
  label: string;
  value: string;
  description: string;
}

const LeaveTypesPage = async () => {
  // Create a mutable copy of the readonly array
  const leaveTypes: LeaveType[] = dummyLeaveTypes.map((leaveType) => ({
    ...leaveType,
  }));

  return (
    <Container>
      <div>
        <div className='my-4 py-6 rounded-md bg-white dark:bg-black'>
          <h2 className='text-xl text-center font-extrabold leading-tight lg:text-2xl'>
            Leave Types
          </h2>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
          <div className='col-span-2'>
            <LeaveTypesTable leaveTypes={leaveTypes} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LeaveTypesPage;

// import Container from '@/components/Common/Container';
// import LeaveTypesTable from './leaveTypesTable';

// // Define interface for leave type
// interface LeaveType {
//   id: number;
//   label: string;
//   value: string;
//   description: string;
// }

// const fetchLeaveTypes = async (): Promise<LeaveType[]> => {
//   const res = await fetch('/api/leave-type', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     cache: 'no-store', // Ensure fresh data fetch
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch leave types');
//   }

//   return res.json();
// };

// const LeaveTypesPage = async () => {
//   let leaveTypes: LeaveType[] = [];

//   try {
//     leaveTypes = await fetchLeaveTypes();
//   } catch (error) {
//     console.error('Error fetching leave types:', error);
//   }

//   return (
//     <Container>
//       <div>
//         <div className='my-4 py-6 rounded-md bg-white dark:bg-black'>
//           <h2 className='text-xl text-center font-extrabold leading-tight lg:text-2xl'>
//             Leave Types
//           </h2>
//         </div>
//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
//           <div className='col-span-2'>
//             <LeaveTypesTable leaveTypes={leaveTypes} />
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default LeaveTypesPage;

// import Container from '@/components/Common/Container';
// import LeaveTypesTable from './leaveTypesTable';

// const LeaveTypes = async () => {
//   return (
//     <Container>
//       <div>
//         <div className=' my-4 py-6 rounded-md bg-white dark:bg-black'>
//           <h2 className='text-xl text-center font-extrabold leading-tight  lg:text-2xl'>
//             Leave Types
//           </h2>
//         </div>
//         <div className='grid grid-cols-1 lg:grid-cols-3 gap-2'>
//           <div className='col-span-2'>
//             <LeaveTypesTable leaveTypes={[]} />
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default LeaveTypes;
