'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LeaveType } from '@prisma/client';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import EditLeaveType from './EditLeaveType';

const getLeaveTypes = async () => {
  const res = await fetch('/api/leave-type', {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch leave types');
  }
  const leaveTypes = await res.json();
  return leaveTypes;
};

const LeaveTypesTable = () => {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const fetchedLeaveTypes = await getLeaveTypes();
        setLeaveTypes(fetchedLeaveTypes);
      } catch (error) {
        toast.error('Failed to load leave types');
      }
    };

    fetchLeaveTypes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/leave-type/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setLeaveTypes(leaveTypes.filter((leaveType) => leaveType.id !== id));
        toast.success('Leave Type Deleted', { duration: 4000 });
      } else {
        const errorMessage = await res.text();
        toast.error(`An error occurred: ${errorMessage}`, { duration: 6000 });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An Unexpected error occurred');
    }
  };

  return (
    <div className='rounded-lg shadow-md px-6 max-h-[50vh] overflow-y-auto bg-white dark:bg-black'>
      <div className='py-5 px-10 sticky top-0 z-10 shadow-md bg-white dark:bg-slate-900'>
        <h2 className='text-2xl text-center font-bold tracking-tight'>
          Available Leave Types
        </h2>
      </div>

      <div className='relative overflow-x-auto'>
        <Table>
          <TableHeader className='whitespace-nowrap'>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='whitespace-nowrap'>
            {leaveTypes.map((leaveType) => (
              <TableRow key={leaveType.id}>
                <TableCell className='font-medium'>{leaveType.title}</TableCell>
                <TableCell>{leaveType.description}</TableCell>
                <TableCell>
                  <button>
                    <EditLeaveType leaveType={leaveType} />
                  </button>
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(leaveType.id)}>
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

export default LeaveTypesTable;
