'use client';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FaSearch } from 'react-icons/fa';

interface EmployeeReport {
  userName: string | null;
  department: string | null;
  days: number;
  type: string | null;
  requestedOn: string;
  moderator: string | null;
  updatedAt: string;
}

const EmployeeReportPage = () => {
  const [employeeReportData, setEmployeeReportData] = useState<
    EmployeeReport[]
  >([]);
  const [filteredData, setFilteredData] = useState<EmployeeReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEmployeeReportData = async () => {
      try {
        const response = await fetch('/api/employee-report', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const leaveData = await response.json();
        setEmployeeReportData(leaveData);
        setFilteredData(leaveData); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching employee leave report data:', error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeReportData();
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const filtered = employeeReportData.filter(
        (report) =>
          report.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.department
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          report.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.moderator?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dayjs(report.requestedOn)
            .format('YYYY-MM-DD HH:mm:ss')
            .includes(searchQuery) ||
          dayjs(report.updatedAt)
            .format('YYYY-MM-DD HH:mm:ss')
            .includes(searchQuery)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(employeeReportData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Employee Leave Report', 14, 16);
    (doc as any).autoTable({
      startY: 22,
      head: [
        [
          'Employee',
          'Department',
          'Total Days',
          'Leave type',
          'Requested On',
          'Approved By',
          'Approval Date',
        ],
      ],
      body: filteredData.map((report) => [
        report.userName || 'N/A',
        report.department || 'N/A',
        report.days,
        report.type || 'N/A',
        dayjs(report.requestedOn).format('YYYY-MM-DD HH:mm:ss'),
        report.moderator || 'N/A',
        dayjs(report.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
      ]),
    });
    doc.save('employee_leave_report.pdf');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-4'>Employee Leave Report</h1>
      <div className='mb-4 flex'>
        <input
          type='text'
          value={searchQuery}
          onChange={handleInputChange}
          placeholder='Search'
          className='p-2 border border-gray-300 rounded-l w-full md:w-1/2 lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-300'
        />
        <button
          onClick={handleSearch}
          className='p-2 border border-gray-300 rounded-r bg-gray-200 hover:bg-gray-300'
        >
          <FaSearch />
        </button>
      </div>
      <table className='min-w-full border border-gray-300 dark:border-gray-700'>
        <thead className='bg-gray-100 dark:bg-gray-800 dark:text-white'>
          <tr>
            <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
              Staff Name
            </th>
            <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
              Department
            </th>
            <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
              Total Days
            </th>
            <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
              Leave type
            </th>
            <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
              Requested On
            </th>
            <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
              Approved By
            </th>
            <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
              Approval Date
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td className='text-center py-4' colSpan={7}>
                No data available
              </td>
            </tr>
          ) : (
            filteredData.map((report, index) => (
              <tr
                key={index}
                className='bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
              >
                <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
                  <Link href={`/empDetails/${report.userName || 'N/A'}`}>
                    {report.userName || 'N/A'}
                  </Link>
                </td>
                <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
                  {report.department || 'N/A'}
                </td>
                <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
                  {report.days}
                </td>
                <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
                  {report.type || 'N/A'}
                </td>
                <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
                  {dayjs(report.requestedOn).format('YYYY-MM-DD HH:mm:ss')}
                </td>
                <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
                  {report.moderator || 'N/A'}
                </td>
                <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
                  {dayjs(report.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button
        onClick={handleDownload}
        className='px-4 py-2 bg-blue-500 text-white rounded mt-4'
      >
        Download Report
      </button>
    </div>
  );
};

export default EmployeeReportPage;

// 'use client';

// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import dayjs from 'dayjs';
// import { FaSearch } from 'react-icons/fa';

// interface EmployeeReport {
//   userName: string | null;
//   department: string | null;
//   days: number;
//   type: string | null;
//   requestedOn: string;
//   moderator: string | null;
//   updatedAt: string;
// }

// const EmployeeReportPage = () => {
//   const [employeeReportData, setEmployeeReportData] = useState<
//     EmployeeReport[]
//   >([]);
//   const [filteredData, setFilteredData] = useState<EmployeeReport[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchEmployeeReportData = async () => {
//       try {
//         const response = await fetch('/api/employee-report', {
//           method: 'GET',
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const leaveData = await response.json();
//         setEmployeeReportData(leaveData);
//         setFilteredData(leaveData); // Initialize filtered data
//       } catch (error) {
//         console.error('Error fetching employee leave report data:', error);
//         setError((error as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployeeReportData();
//   }, []);

//   const handleSearch = () => {
//     if (searchQuery) {
//       const filtered = employeeReportData.filter(
//         (report) =>
//           report.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           report.department
//             ?.toLowerCase()
//             .includes(searchQuery.toLowerCase()) ||
//           report.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           report.moderator?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           dayjs(report.requestedOn)
//             .format('YYYY-MM-DD HH:mm:ss')
//             .includes(searchQuery) ||
//           dayjs(report.updatedAt)
//             .format('YYYY-MM-DD HH:mm:ss')
//             .includes(searchQuery)
//       );
//       setFilteredData(filtered);
//     } else {
//       setFilteredData(employeeReportData);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleDownload = () => {
//     const doc = new jsPDF();
//     doc.text('Employee Leave Report', 14, 16);
//     (doc as any).autoTable({
//       startY: 22,
//       head: [
//         [
//           'Employee',
//           'Department',
//           'Total Days',
//           'Leave type',
//           'Requested On',
//           'Approved By',
//           'Approval Date',
//         ],
//       ],
//       body: filteredData.map((report) => [
//         report.userName || 'N/A',
//         report.department || 'N/A',
//         report.days,
//         report.type || 'N/A',
//         dayjs(report.requestedOn).format('YYYY-MM-DD HH:mm:ss'),
//         report.moderator || 'N/A',
//         dayjs(report.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
//       ]),
//     });
//     doc.save('employee_leave_report.pdf');
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className='container mx-auto px-4 py-8'>
//       <h1 className='text-2xl font-bold mb-4'>Employee Leave Report</h1>
//       <div className='mb-4 flex'>
//         <input
//           type='text'
//           value={searchQuery}
//           onChange={handleInputChange}
//           placeholder='Search'
//           className='p-2 border border-gray-300 rounded-l w-full md:w-1/2 lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-300'
//         />
//         <button
//           onClick={handleSearch}
//           className='p-2 border border-gray-300 rounded-r bg-gray-200 hover:bg-gray-300'
//         >
//           <FaSearch />
//         </button>
//       </div>
//       <table className='min-w-full border border-gray-300 dark:border-gray-700'>
//         <thead className='bg-gray-100 dark:bg-gray-800 dark:text-white'>
//           <tr>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Staff Name
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Department
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Total Days
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Leave type
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Requested On
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Approved By
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Approval Date
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length === 0 ? (
//             <tr>
//               <td className='text-center py-4' colSpan={7}>
//                 No data available
//               </td>
//             </tr>
//           ) : (
//             filteredData.map((report, index) => (
//               <tr
//                 key={index}
//                 className='bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
//               >
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   <Link href={`/empDetails/${report.userName || 'N/A'}`}>
//                     {report.userName || 'N/A'}
//                   </Link>
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {report.department || 'N/A'}
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {report.days}
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {report.type || 'N/A'}
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {dayjs(report.requestedOn).format('YYYY-MM-DD HH:mm:ss')}
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {report.moderator || 'N/A'}
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {dayjs(report.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//       <button
//         onClick={handleDownload}
//         className='px-4 py-2 bg-blue-500 text-white rounded mt-4'
//       >
//         Download Report
//       </button>
//     </div>
//   );
// };

// export default EmployeeReportPage;

// 'use client';

// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import dayjs from 'dayjs';

// interface EmployeeReport {
//   userName: string | null;
//   department: string | null;
//   days: number;
//   type: string | null;
//   requestedOn: string;
//   moderator: string | null;
//   updatedAt: string;
// }

// const EmployeeReportPage = () => {
//   const [employeeReportData, setEmployeeReportData] = useState<
//     EmployeeReport[]
//   >([]);
//   const [filteredData, setFilteredData] = useState<EmployeeReport[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchEmployeeReportData = async () => {
//       try {
//         const response = await fetch('/api/employee-report', {
//           method: 'GET',
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const leaveData = await response.json();
//         setEmployeeReportData(leaveData);
//         setFilteredData(leaveData); // Initialize filtered data
//       } catch (error) {
//         console.error('Error fetching employee leave report data:', error);
//         setError((error as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployeeReportData();
//   }, []);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     if (query) {
//       const filtered = employeeReportData.filter(
//         (report) =>
//           report.userName?.toLowerCase().includes(query.toLowerCase()) ||
//           report.department?.toLowerCase().includes(query.toLowerCase()) ||
//           report.type?.toLowerCase().includes(query.toLowerCase()) ||
//           report.moderator?.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredData(filtered);
//     } else {
//       setFilteredData(employeeReportData);
//     }
//   };

//   const handleDownload = () => {
//     const doc = new jsPDF();
//     doc.text('Employee Leave Report', 14, 16);
//     (doc as any).autoTable({
//       startY: 22,
//       head: [
//         [
//           'Employee',
//           'Department',
//           'Total Days',
//           'Leave type',
//           'Requested On',
//           'Approved By',
//           'Approval Date',
//         ],
//       ],
//       body: filteredData.map((report) => [
//         report.userName || 'N/A',
//         report.department || 'N/A',
//         report.days,
//         report.type || 'N/A',
//         dayjs(report.requestedOn).format('YYYY-MM-DD HH:mm:ss'),
//         report.moderator || 'N/A',
//         dayjs(report.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
//       ]),
//     });
//     doc.save('employee_leave_report.pdf');
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className='container mx-auto px-4 py-8'>
//       <h1 className='text-2xl font-bold mb-4'>Employee Leave Report</h1>
//       <div className='mb-4'>
//         <input
//           type='text'
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder='Search'
//           className='p-2 border border-gray-300 rounded w-full md:w-1/2 lg:w-1/3'
//         />
//       </div>
//       <table className='min-w-full border border-gray-300 dark:border-gray-700'>
//         <thead className='bg-gray-100 dark:bg-gray-800 dark:text-white'>
//           <tr>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Staff Name
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Department
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Total Days
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Leave type
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Requested On
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Approved By
//             </th>
//             <th className='py-2 px-4 border border-gray-300 dark:border-gray-700'>
//               Approval Date
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length === 0 ? (
//             <tr>
//               <td className='text-center py-4' colSpan={7}>
//                 No data available
//               </td>
//             </tr>
//           ) : (
//             filteredData.map((report, index) => (
//               <tr
//                 key={index}
//                 className='bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
//               >
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   <Link href={`/empDetails/${report.userName || 'N/A'}`}>
//                     {report.userName || 'N/A'}
//                   </Link>
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {report.department || 'N/A'}
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {report.days}
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {report.type || 'N/A'}
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {dayjs(report.requestedOn).format('YYYY-MM-DD HH:mm:ss')}
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {report.moderator || 'N/A'}
//                 </td>
//                 <td className='border px-4 py-2 border-gray-300 dark:border-gray-700'>
//                   {dayjs(report.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//       <button
//         onClick={handleDownload}
//         className='px-4 py-2 bg-blue-500 text-white rounded mt-4'
//       >
//         Download Report
//       </button>
//     </div>
//   );
// };

// export default EmployeeReportPage;
