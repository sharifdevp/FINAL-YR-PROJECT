'use client';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  const [employeeReportData, setEmployeeReportData] = useState<EmployeeReport[]>([]);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = employeeReportData.filter(report =>
        (report.userName?.toLowerCase().includes(query.toLowerCase()) || '') ||
        (report.department?.toLowerCase().includes(query.toLowerCase()) || '') ||
        (report.type?.toLowerCase().includes(query.toLowerCase()) || '') ||
        (report.moderator?.toLowerCase().includes(query.toLowerCase()) || '')
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(employeeReportData);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Employee Leave Report', 14, 16);
    (doc as any).autoTable({
      startY: 22,
      head: [['Employee', 'Department', 'Total Days', 'Leave type', 'Requested On', 'Approved By', 'Approval Date']],
      body: filteredData.map(report => [
        report.userName || 'N/A',
        report.department|| 'N/A',
        report.days,
        report.type || 'N/A',
        new Date(report.requestedOn).toLocaleDateString(),
        report.moderator || 'N/A',
        report.updatedAt
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Employee Leave Report</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
          className="p-2 border border-gray-300 rounded w-full md:w-1/2 lg:w-1/3"
        />
      </div>
      <table className="min-w-full border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
          <tr>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Staff Name</th>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Department</th>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Total Days</th>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Leave type</th>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Requested On</th>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Approved By</th>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Approval Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td className="text-center py-4" colSpan={6}>
                No data available
              </td>
            </tr>
          ) : (
            filteredData.map((report, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
                  <Link href={`/empDetails/${report.userName || 'N/A'}`}>
                    {report.userName || 'N/A'}
                  </Link>
                </td>
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
                  {report.department|| 'N/A'}
                </td>
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
                  {report.days}
                </td>
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
                  {report.type || 'N/A'}
                </td>
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
                  {new Date(report.requestedOn).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
                  {report.moderator|| 'N/A'}
                </td>
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
                  {new Date(report.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
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

// interface EmployeeReport {
//   userName: string | null;
//   days: number;
//   type: string | null;
//   requestedOn: string;
//   moderator: string | null;
// }

// const EmployeeReportPage = () => {
//   const [employeeReportData, setEmployeeReportData] = useState<EmployeeReport[]>([]);
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
//       const filtered = employeeReportData.filter(report =>
//         (report.userName?.toLowerCase().includes(query.toLowerCase()) || '') ||
//         (report.type?.toLowerCase().includes(query.toLowerCase()) || '') ||
//         (report.moderator?.toLowerCase().includes(query.toLowerCase()) || '')
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
//       head: [['Employee', 'Total Days', 'Leave type', 'Requested On', 'Approved By']],
//       body: filteredData.map(report => [
//         report.userName || 'N/A',
//         report.days,
//         report.type || 'N/A',
//         new Date(report.requestedOn).toLocaleDateString(),
//         report.moderator || 'N/A'
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
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Employee Leave Report</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder="Search"
//           className="p-2 border border-gray-300 rounded w-full md:w-1/2 lg:w-1/3"
//         />
//       </div>
//       <table className="min-w-full border border-gray-300 dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
//           <tr>
//             <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Employee Name</th>
//             <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Department</th>
//             <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Total Days</th>
//             <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Leave type</th>
//             <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Requested On</th>
//             <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Approval Date</th>
//             <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Approved By</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length === 0 ? (
//             <tr>
//               <td className="text-center py-4" colSpan={6}>
//                 No data available
//               </td>
//             </tr>
//           ) : (
//             filteredData.map((report, index) => (
//               <tr
//                 key={index}
//                 className="bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//               >
//                 <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
//                   <Link href={`/empDetails/${report.userName || 'N/A'}`}>
//                     {report.userName || 'N/A'}
//                   </Link>
//                 </td>
//                 <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
//                   {report.days}
//                 </td>
//                 <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
//                   {report.type || 'N/A'}
//                 </td>
//                 <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
//                   {new Date(report.requestedOn).toLocaleDateString()}
//                 </td>
//                 <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">
//                   {report.moderator || 'N/A'}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//       <button
//         onClick={handleDownload}
//         className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
//       >
//         Download Report
//       </button>
//     </div>
//   );
// };

// export default EmployeeReportPage;








