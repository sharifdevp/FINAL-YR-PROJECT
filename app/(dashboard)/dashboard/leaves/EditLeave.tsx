'use client';

import DialogWrapper from '@/components/Common/DialogWrapper';
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
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PiCaretUpDownBold } from 'react-icons/pi';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { BsCheckLg } from 'react-icons/bs';
import { leaveStatus } from '@/lib/dummy-data';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


type EditLeaveProps = {
  id: string;
  days: number;
  type: string;
  year: string;
  email: string;
  user: string;
  startDate: Date;
  phoneNumber: string | null;
};

const EditLeave = ({
  id,
  days,
  type,
  year,
  email,
  user,
  startDate,
  phoneNumber,
}: EditLeaveProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    notes: z.string().max(500),
    status: z.enum(leaveStatus),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: '',
    },
  });

  async function editLeave(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formValues = {
        ...values,
        notes: values.notes,
        status: values.status,
        id,
        days,
        type,
        year,
        email,
        user,
        startDate,
      };

      const res = await fetch('/api/leave/leaveId', {
        method: 'PATCH',
        body: JSON.stringify(formValues),
      });

      if (res.ok) {
        // Log the phoneNumber and message
        console.log('PhoneNumber:', phoneNumber);
        console.log('SMS Payload:', {
          phoneNumber: phoneNumber,
          message: `Leave Approval Notice\nStatus: ${values.status}\nNotes: ${values.notes}`,
        });

        // Send SMS notification
        const smsResponse = await fetch('/api/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
            message: `Leave Approval Notification\n\nDear ${user},\n\nYour leave request has been processed.\n\nStatus: ${values.status}\n\nComments: ${values.notes}\n\nThank you,\nHR Department`,
          }),
        });

        if (!smsResponse.ok) {
          throw new Error('Failed to send SMS');
        }

        // Send approval email
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: email,
            subject: 'Leave Approval Notice',
            status: values.status,
            userEmail: user,
            notes: values.notes,
          }),
        });

        if (!emailResponse.ok) {
          throw new Error('Failed to send email');
        }

        toast.success('Approval Action Completed Successfully', {
          duration: 15000,
        });

        setOpen(false);
        router.refresh();
      } else {
        const errorMessage = await res.text();
        toast.error(`An error occurred: ${errorMessage}`, { duration: 15000 });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DialogWrapper
      btnTitle='Take Action'
      title='Action Decision'
      isBtn={true}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(editLeave)} className='space-y-8'>
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Make a Decision</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? leaveStatus.find((status) => status === field.value)
                          : 'Select a decision'}
                        <PiCaretUpDownBold className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandInput placeholder='Search a status...' />
                      <CommandEmpty>No leave type found.</CommandEmpty>
                      <CommandGroup>
                        {leaveStatus.map((status, i) => (
                          <CommandItem
                            value={status}
                            key={i}
                            onSelect={() => {
                              form.setValue('status', status);
                            }}
                          >
                            <BsCheckLg
                              className={cn(
                                'mr-2 h-4 w-4',
                                status === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {status}
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
            name='notes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder='Notes' {...field} />
                </FormControl>
                <FormDescription>
                  Add extra notes to support your decision.
                </FormDescription>
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

export default EditLeave;

// 'use client'; // Add this line at the top

// import DialogWrapper from '@/components/Common/DialogWrapper';
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
// import { Textarea } from '@/components/ui/textarea';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import * as z from 'zod';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import { PiCaretUpDownBold } from 'react-icons/pi';
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from '@/components/ui/command';
// import { BsCheckLg } from 'react-icons/bs';
// import { leaveStatus } from '@/lib/dummy-data';
// import { cn } from '@/lib/utils';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// type EditLeaveProps = {
//   id: string;
//   days: number;
//   type: string;
//   year: string;
//   email: string;
//   user: string;
//   startDate: Date;
//   phoneNumber: string | null;
// };

// const EditLeave = ({
//   id,
//   days,
//   type,
//   year,
//   email,
//   user,
//   startDate,
//   phoneNumber,
// }: EditLeaveProps) => {
//   const [open, setOpen] = useState(false);
//   const router = useRouter();

//   const formSchema = z.object({
//     notes: z.string().max(500),
//     status: z.enum(leaveStatus),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       notes: '',
//     },
//   });

//   async function editLeave(values: z.infer<typeof formSchema>) {
//     try {
//       const formValues = {
//         ...values,
//         notes: values.notes,
//         status: values.status,
//         id,
//         days,
//         type,
//         year,
//         email,
//         user,
//         startDate,
//       };

//       const res = await fetch('/api/leave/leaveId', {
//         method: 'PATCH',
//         body: JSON.stringify(formValues),
//       });

//       if (res.ok) {
//         // Log the phoneNumber and message
//         console.log('PhoneNumber:', phoneNumber);
//         console.log('SMS Payload:', {
//           phoneNumber: phoneNumber,
//           message: `Leave Approval Notice\nStatus: ${values.status}\nNotes: ${values.notes}`,
//         });

//         // Send SMS notification
//         const smsResponse = await fetch('/api/send-sms', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             phoneNumber: phoneNumber,
//             message: `Leave Approval Notice\nStatus: ${values.status}\nComment notes: ${values.notes}`,
//           }),
//         });
//         if (!smsResponse.ok) {
//           throw new Error('Failed to send SMS');
//         }

//         // Send approval email
//         const emailResponse = await fetch('/api/send-email', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             to: email,
//             subject: 'Leave Approval Notice',
//             status: values.status,
//             userEmail: user,
//             notes: values.notes,
//           }),
//         });

//         if (!emailResponse.ok) {
//           throw new Error('Failed to send email');
//         }

//         toast.success('Approval Action Successful', {
//           duration: 15000,
//         });

//         setOpen(false);
//         router.refresh();
//       } else {
//         const errorMessage = await res.text();
//         toast.error(`An error occurred: ${errorMessage}`, { duration: 15000 });
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//       toast.error('An unexpected error occurred');
//     }
//   }

//   return (
//     <DialogWrapper
//       btnTitle='Take Action'
//       title='Action Decision'
//       isBtn={true}
//       open={open}
//       setOpen={() => setOpen(!open)}
//     >
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(editLeave)} className='space-y-8'>
//           <FormField
//             control={form.control}
//             name='status'
//             render={({ field }) => (
//               <FormItem className='flex flex-col'>
//                 <FormLabel>Make a Decision</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant='outline'
//                         role='combobox'
//                         className={cn(
//                           'justify-between',
//                           !field.value && 'text-muted-foreground'
//                         )}
//                       >
//                         {field.value
//                           ? leaveStatus.find((status) => status === field.value)
//                           : 'Select a decision'}
//                         <PiCaretUpDownBold className='ml-2 h-4 w-4 shrink-0 opacity-50' />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className='w-[200px] p-0'>
//                     <Command>
//                       <CommandInput placeholder='Search a status...' />
//                       <CommandEmpty>No leave type found.</CommandEmpty>
//                       <CommandGroup>
//                         {leaveStatus.map((status, i) => (
//                           <CommandItem
//                             value={status}
//                             key={i}
//                             onSelect={() => {
//                               form.setValue('status', status);
//                             }}
//                           >
//                             <BsCheckLg
//                               className={cn(
//                                 'mr-2 h-4 w-4',
//                                 status === field.value
//                                   ? 'opacity-100'
//                                   : 'opacity-0'
//                               )}
//                             />
//                             {status}
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
//             name='notes'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Notes</FormLabel>
//                 <FormControl>
//                   <Textarea placeholder='Notes' {...field} />
//                 </FormControl>
//                 <FormDescription>
//                   Add extra notes to support your decision.
//                 </FormDescription>
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

// export default EditLeave;
