'use client';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useEffect, useState } from 'react';

interface DepartmentReport {
  departmentName: string;
  totalEmployees: number;
  totalLeaves: number;
  pendingLeaves: number;
  approvedLeaves: number;
  rejectedLeaves: number;
}

const DepartmentReportPage = () => {
  const [departmentReportData, setDepartmentReportData] = useState<DepartmentReport[]>([]);
  const [filteredData, setFilteredData] = useState<DepartmentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDepartmentReportData = async () => {
      try {
        const response = await fetch('/api/department-report');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: DepartmentReport[] = await response.json();
        setDepartmentReportData(data);
        setFilteredData(data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching department leave report data:', error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentReportData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = departmentReportData.filter(report =>
        report.departmentName?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(departmentReportData);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Department Leave Report', 14, 16);
    (doc as any).autoTable({
      startY: 22,
      head: [['Department Name', 'Total Leaves', 'Pending Leaves', 'Approved Leaves', 'Rejected Leaves']],
      body: filteredData.map(report => [
        report.departmentName || 'N/A',
        report.totalEmployees,
        report.totalLeaves,
        report.pendingLeaves,
        report.approvedLeaves,
        report.rejectedLeaves
      ]),
    });
    doc.save('department_leave_report.pdf');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Department Leave Report</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
          className="p-2 border border-gray-300 rounded w-80 md:w-1/2 lg:w-1/3"
        />
      </div>
      <table className="min-w-full border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
          <tr>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Department Name</th>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Total Employees</th>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Total Leaves</th>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Pending Leaves</th>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Approved Leaves</th>
            <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Rejected Leaves</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td className="text-center py-4 border border-gray-300 dark:border-gray-700" colSpan={5}>
                No data available
              </td>
            </tr>
          ) : (
            filteredData.map((report, index) => (
              <tr key={index} className="bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">{report.departmentName || 'N/A'}</td>
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">{report.totalEmployees}</td>
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">{report.totalLeaves}</td>
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">{report.pendingLeaves}</td>
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">{report.approvedLeaves}</td>
                <td className="border px-4 py-2 border-gray-300 dark:border-gray-700">{report.rejectedLeaves}</td>
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

export default DepartmentReportPage;



