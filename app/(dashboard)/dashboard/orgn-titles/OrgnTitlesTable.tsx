'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrgnTitle } from '@prisma/client';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import EditOrgnTitle from './EditOrgnTitle';

// Fetching organization titles data from the API
const fetchOrgnTitles = async () => {
  const res = await fetch('/api/orgn-title');
  if (!res.ok) {
    throw new Error('Failed to fetch organization titles');
  }
  const orgnTitles = await res.json();
  return orgnTitles;
};

const OrgnTitlesTable = () => {
  const [titles, setTitles] = useState<OrgnTitle[]>([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const fetchedTitles = await fetchOrgnTitles();
        setTitles(fetchedTitles);
      } catch (error) {
        toast.error('Failed to load organization titles');
      }
    };

    fetchTitles();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/orgn-title/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTitles(titles.filter((title) => title.id !== id));
        toast.success('Title Deleted', { duration: 4000 });
      } else {
        const errorMessage = await res.text();
        toast.error(`An error occurred: ${errorMessage}`, { duration: 6000 });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className='rounded-lg shadow-md px-6 max-h-[50vh] overflow-y-auto bg-white dark:bg-black'>
      <div className='py-5 px-10 sticky top-0 z-10 shadow-md bg-white dark:bg-slate-900'>
        <h2 className='text-2xl text-center font-bold tracking-tight'>
          Available Employee Titles
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
            {titles.map((title) => (
              <TableRow key={title.id}>
                <TableCell className='font-medium'>{title.titlename}</TableCell>
                <TableCell>{title.description}</TableCell>
                <TableCell>
                  <EditOrgnTitle
                    id={title.id}
                    titleName={title.titlename}
                    description={title.description}
                  />
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(title.id)}>
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

export default OrgnTitlesTable;
