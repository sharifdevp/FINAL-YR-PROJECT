'use client';
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PiCaretUpDownBold } from 'react-icons/pi';
import { BsCheckLg } from 'react-icons/bs';
import { IoCalendarOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { format } from 'date-fns';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { leaveTypes } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import DialogWrapper from '@/components/Common/DialogWrapper';
import toast from 'react-hot-toast';
import { useState } from 'react';

// Define the User type
type User = {
  email: string | null;
  image: string | null;
  name: string | null;
  role: string;
};

type Props = {
  user: User;
};

const RequestForm = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z
    .object({
      notes: z.string().nonempty('Notes are required.').max(500),
      leave: z.string().nonempty('Please select a leave type.'),
      startDate: z.date({ required_error: 'A start date is required.' }),
      endDate: z.date({ required_error: 'An end date is required.' }),
      file: z.instanceof(File).optional(),
    })
    .superRefine((data, ctx) => {
      if (data.startDate < new Date()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Start date cannot be in the past.',
          path: ['startDate'],
        });
      }
      if (data.endDate < data.startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'End date cannot be before the start date. Please enter the correct End date',
          path: ['endDate'],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          ...values,
          startDate: values.startDate.toISOString(),
          endDate: values.endDate.toISOString(),
          user,
        })
      );
      if (values.file) {
        formData.append('file', values.file);
      }

      const res = await fetch('/api/leave', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        toast.success('Request Submitted', { duration: 13000 });
        setOpen(false);
        form.reset();
      } else {
        const errorMessage = await res.text();
        toast.error(`An error occurred: ${errorMessage}`, { duration: 13000 });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An Unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DialogWrapper
      btnTitle='Apply for Leave'
      title='Submit your Leave Application'
      descr='Make sure you select the right dates for leave.'
      isBtn={true}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='leave'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Leave Type</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          ' justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? leaveTypes.find(
                              (leave) => leave.value === field.value
                            )?.label
                          : 'Select a leave'}
                        <PiCaretUpDownBold className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandInput placeholder='Search a leave...' />
                      <CommandEmpty>No leave type found.</CommandEmpty>
                      <CommandGroup>
                        {leaveTypes.map((leave) => (
                          <CommandItem
                            value={leave.label}
                            key={leave.value}
                            onSelect={() => {
                              form.setValue('leave', leave.value);
                            }}
                          >
                            <BsCheckLg
                              className={cn(
                                'mr-2 h-4 w-4',
                                leave.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {leave.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          '  inline-flex justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <IoCalendarOutline className=' h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          '  inline-flex justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <IoCalendarOutline className=' h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='notes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder='Notes' {...field} />
                </FormControl>
                <FormDescription>
                  Add extra notes to support your request.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='file'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Upload supporting document if available <br />
                  (Only PDF files are allowed)
                </FormLabel>
                <FormControl>
                  <input
                    type='file'
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </DialogWrapper>
  );
};

export default RequestForm;

// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import { PiCaretUpDownBold } from 'react-icons/pi';
// import { BsCheckLg } from 'react-icons/bs';
// import { IoCalendarOutline } from 'react-icons/io5';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { format } from 'date-fns';
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from '@/components/ui/command';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import { leaveTypes } from '@/lib/dummy-data';
// import { cn } from '@/lib/utils';
// import { Textarea } from '@/components/ui/textarea';
// import { Calendar } from '@/components/ui/calendar';
// import DialogWrapper from '@/components/Common/DialogWrapper';
// import toast from 'react-hot-toast';
// import { useState } from 'react';

// // Define the User type
// type User = {
//   email: string | null;
//   image: string | null;
//   name: string | null;
//   role: string;
// };

// type Props = {
//   user: User;
// };

// const RequestForm = ({ user }: Props) => {
//   const [open, setOpen] = useState(false);

//   const formSchema = z
//     .object({
//       notes: z.string().nonempty('Notes are required.').max(500),
//       leave: z.string().nonempty('Please select a leave type.'),
//       startDate: z.date({ required_error: 'A start date is required.' }),
//       endDate: z.date({ required_error: 'An end date is required.' }),
//       file: z.instanceof(File).optional(),
//     })
//     .superRefine((data, ctx) => {
//       if (data.startDate < new Date()) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: 'Start date cannot be in the past.',
//           path: ['startDate'],
//         });
//       }
//       if (data.endDate < data.startDate) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message:
//             'End date cannot be before the start date. Please enter the correct End date',
//           path: ['endDate'],
//         });
//       }
//     });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       notes: '',
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       const formData = new FormData();
//       formData.append(
//         'data',
//         JSON.stringify({
//           ...values,
//           startDate: values.startDate.toISOString(),
//           endDate: values.endDate.toISOString(),
//           user,
//         })
//       );
//       if (values.file) {
//         formData.append('file', values.file);
//       }

//       const res = await fetch('/api/leave', {
//         method: 'POST',
//         body: formData,
//       });

//       if (res.ok) {
//         toast.success('Request Submitted', { duration: 13000 });
//         setOpen(false);
//         form.reset();
//       } else {
//         const errorMessage = await res.text();
//         toast.error(`An error occurred: ${errorMessage}`, { duration: 13000 });
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//       toast.error('An Unexpected error occurred');
//     }
//   }

//   return (
//     <DialogWrapper
//       btnTitle='Apply for Leave'
//       title='Submit your Leave Application'
//       descr='Make sure you select the right dates for leave.'
//       isBtn={true}
//       open={open}
//       setOpen={() => setOpen(!open)}
//     >
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
//           <FormField
//             control={form.control}
//             name='leave'
//             render={({ field }) => (
//               <FormItem className='flex flex-col'>
//                 <FormLabel>Leave Type</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant='outline'
//                         role='combobox'
//                         className={cn(
//                           ' justify-between',
//                           !field.value && 'text-muted-foreground'
//                         )}
//                       >
//                         {field.value
//                           ? leaveTypes.find(
//                               (leave) => leave.value === field.value
//                             )?.label
//                           : 'Select a leave'}
//                         <PiCaretUpDownBold className='ml-2 h-4 w-4 shrink-0 opacity-50' />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className='w-[200px] p-0'>
//                     <Command>
//                       <CommandInput placeholder='Search a leave...' />
//                       <CommandEmpty>No leave type found.</CommandEmpty>
//                       <CommandGroup>
//                         {leaveTypes.map((leave) => (
//                           <CommandItem
//                             value={leave.label}
//                             key={leave.value}
//                             onSelect={() => {
//                               form.setValue('leave', leave.value);
//                             }}
//                           >
//                             <BsCheckLg
//                               className={cn(
//                                 'mr-2 h-4 w-4',
//                                 leave.value === field.value
//                                   ? 'opacity-100'
//                                   : 'opacity-0'
//                               )}
//                             />
//                             {leave.label}
//                           </CommandItem>
//                         ))}
//                       </CommandGroup>
//                     </Command>
//                   </PopoverContent>
//                 </Popover>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name='startDate'
//             render={({ field }) => (
//               <FormItem className='flex flex-col'>
//                 <FormLabel>Start Date</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant={'outline'}
//                         className={cn(
//                           '  inline-flex justify-between',
//                           !field.value && 'text-muted-foreground'
//                         )}
//                       >
//                         {field.value ? (
//                           format(field.value, 'PPP')
//                         ) : (
//                           <span>Pick a date</span>
//                         )}
//                         <IoCalendarOutline className=' h-4 w-4 opacity-50' />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className='w-auto p-0' align='start'>
//                     <Calendar
//                       mode='single'
//                       selected={field.value}
//                       onSelect={field.onChange}
//                       disabled={(date: Date) => date < new Date()}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name='endDate'
//             render={({ field }) => (
//               <FormItem className='flex flex-col'>
//                 <FormLabel>End Date</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant={'outline'}
//                         className={cn(
//                           '  inline-flex justify-between',
//                           !field.value && 'text-muted-foreground'
//                         )}
//                       >
//                         {field.value ? (
//                           format(field.value, 'PPP')
//                         ) : (
//                           <span>Pick a date</span>
//                         )}
//                         <IoCalendarOutline className=' h-4 w-4 opacity-50' />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className='w-auto p-0' align='start'>
//                     <Calendar
//                       mode='single'
//                       selected={field.value}
//                       onSelect={field.onChange}
//                       disabled={(date: Date) => date < new Date()}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name='notes'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Notes</FormLabel>
//                 <FormControl>
//                   <Textarea placeholder='Notes' {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   Add extra notes to support your request.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name='file'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   Upload supporting document if available <br />
//                   (Only PDF files are allowed)
//                 </FormLabel>
//                 <FormControl>
//                   <input
//                     type='file'
//                     onChange={(e) => field.onChange(e.target.files?.[0])}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type='submit'>Submit</Button>
//         </form>
//       </Form>
//     </DialogWrapper>
//   );
// };

// export default RequestForm;
