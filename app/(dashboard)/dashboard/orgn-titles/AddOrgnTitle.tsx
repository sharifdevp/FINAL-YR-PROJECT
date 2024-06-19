'use client';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import toast from 'react-hot-toast';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const AddDepartment = () => {
  const router = useRouter();

  const formSchema = z.object({
    titlename: z
      .string({
        required_error: 'Please add a title.',
      })
      .max(100),
    description: z.string({
      required_error: 'Please add a Description.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titlename: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch('/api/orgn-title/orgn-titleId', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        toast.success('Employee title Added', { duration: 8000 });
        form.reset();
        router.refresh();
      } else {
        const errorMessage = await res.text();
        toast.error(`An error occurred: ${errorMessage}`, { duration: 8000 });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An Unexpected error occurred');
    }
  }

  return (
    <div className='bg-white p-4 rounded-md shadow-md dark:bg-black'>
      <h2 className='text-2xl text-center font-bold tracking-tight'>
        Add a title for employees
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='titlename'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Title' {...field} />
                </FormControl>
                <FormDescription>Add a title for employees</FormDescription>
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
                  <Textarea placeholder='Description' {...field} />
                </FormControl>
                <FormDescription>
                  Briefly describe the new title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddDepartment;
