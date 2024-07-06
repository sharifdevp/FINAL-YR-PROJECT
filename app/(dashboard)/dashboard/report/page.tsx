'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ReportSelection = () => {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState('');

  const handleSelection = () => {
    if (selectedReport) {
      router.push(`/dashboard/report/${selectedReport}`);
    }
  };

  return (
    <div className='flex items-start justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-16'>
      <div className='bg-white dark:bg-gray-800 p-12 rounded shadow-md w-full max-w-4xl min-h-[500px] flex flex-col justify-center'>
        <h1 className='text-3xl font-bold mt-0 mb-12 text-center text-gray-500 dark:text-white'>
          Select Report Type
        </h1>
        <select
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          className='mb-6 px-4 py-3 border rounded w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 text-lg'
        >
          <option className='text-grey-500' value='' disabled>
            Select Leave Report
          </option>
          <option value='department'>Report By Department</option>
          <option value='employee'>Report By Employee</option>
          {/* Add other report types here */}
        </select>
        <button
          onClick={handleSelection}
          className='w-full px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200'
        >
          Go to Report
        </button>
      </div>
    </div>
  );
};

export default ReportSelection;

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// const ReportSelection = () => {
//   const router = useRouter();
//   const [selectedReport, setSelectedReport] = useState('');

//   const handleSelection = () => {
//     if (selectedReport) {
//       router.push(`/dashboard/report/${selectedReport}`);
//     }
//   };

//   return (
//     <div className="flex items-start justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-16">
//       <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
//           Select Report Type
//         </h1>
//         <select
//           value={selectedReport}
//           onChange={(e) => setSelectedReport(e.target.value)}
//           className="mb-4 px-4 py-2 border rounded w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
//         >
//           <option value="">Select Leave Report</option>
//           <option value="department">Report By Department</option>
//           <option value="employee">Report By Employee</option>
//           {/* Add other report types here */}
//         </select>
//         <button
//           onClick={handleSelection}
//           className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
//         >
//           Go to Report
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReportSelection;
