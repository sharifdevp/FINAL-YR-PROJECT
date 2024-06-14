'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Events } from '@prisma/client';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useState } from 'react';
import toast from 'react-hot-toast';

type UserProps = {
  events: Events[];
};

const EventsTable = ({ events: initialEvents }: UserProps) => {
  const [events, setEvents] = useState<Events[]>(initialEvents);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/event/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setEvents(events.filter((event) => event.id !== id));
        toast.success('Event Deleted', { duration: 4000 });
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
          Available Events
        </h2>
      </div>

      <div className='relative overflow-x-auto'>
        <Table>
          <TableHeader className='whitespace-nowrap'>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='whitespace-nowrap'>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className='font-medium'>{event.title}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>
                  {new Date(event.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(event.id)}>
                    <FaRegTrashCan size={18} />
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

export default EventsTable;
