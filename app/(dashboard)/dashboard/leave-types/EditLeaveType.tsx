'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DialogWrapper from '@/components/Common/DialogWrapper';
import toast from 'react-hot-toast';
import { IoPencil } from 'react-icons/io5';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LeaveType } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type EditLeaveTypeProps = {
  leaveType: LeaveType;
};

const EditLeaveType = ({ leaveType }: EditLeaveTypeProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: leaveType.title,
      description: leaveType.description || '',
    },
  });

  async function SubmitEditLeaveType(values: z.infer<typeof formSchema>) {
    const id = leaveType.id;
    try {
      const res = await fetch(`/api/leave-type/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success('Leave Type Edited Successfully', { duration: 8000 });
        setOpen(false);
        router.refresh();
      } else {
        const errorMessage = await res.text();
        toast.error(`An error occurred: ${errorMessage}`, { duration: 8000 });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An unexpected error occurred');
    }
  }

  return (
    <DialogWrapper
      title='Edit Leave Type'
      icon={IoPencil}
      isBtn={false}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(SubmitEditLeaveType)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder='Description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </DialogWrapper>
  );
};

export default EditLeaveType;
