'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DialogWrapper from '@/components/Common/DialogWrapper';
import { UserRoles } from '@/lib/dummy-data';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiCaretUpDownBold } from 'react-icons/pi';
import { BsCheckLg } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import { cn } from '@/lib/utils';

type EditUserProps = {
  user: User;
  onUpdate: (updatedUser: User) => void;
};

const EditUser = ({ user, onUpdate }: EditUserProps) => {
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState<
    { id: string; label: string }[]
  >([]);
  const [titles, setTitles] = useState<{ id: string; titlename: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    id: z.string(),
    phone: z.string().max(50),
    departmentId: z.string(),
    titleId: z.string(),
    role: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user.id,
      phone: user.phone as string,
      departmentId: user.departmentId as string,
      titleId: user.titleId as string,
      role: user.role,
    },
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch('/api/department');
        if (!res.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await res.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        toast.error('Error fetching departments');
      }
    };

    const fetchTitles = async () => {
      try {
        const res = await fetch('/api/orgn-title');
        if (!res.ok) {
          throw new Error('Failed to fetch titles');
        }
        const data = await res.json();
        setTitles(data);
      } catch (error) {
        console.error('Error fetching titles:', error);
        toast.error('Error fetching titles');
      }
    };

    fetchDepartments();
    fetchTitles();
  }, []);

  async function submitEditUser(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/user/${values.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success('User information updated', { duration: 8000 });
        onUpdate(data.user);
        setOpen(false);
        router.refresh();
      } else {
        const errorMessage = await res.text();
        toast.error(`An error occurred ${errorMessage}`, { duration: 6000 });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An Unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  const roleKeys = Object.keys(UserRoles) as Array<keyof typeof UserRoles>;

  return (
    <DialogWrapper
      title='Edit User'
      icon={IoPencil}
      isBtn={false}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitEditUser)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder='Phone' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='departmentId'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Department</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={`justify-between ${
                          !field.value && 'text-muted-foreground'
                        }`}
                      >
                        {field.value
                          ? departments.find((dpt) => dpt.id === field.value)
                              ?.label
                          : 'Select a department'}
                        <PiCaretUpDownBold className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0 max-h-60 overflow-y-auto'>
                    <Command>
                      <CommandInput placeholder='Search Department...' />
                      <CommandEmpty>No Department found.</CommandEmpty>
                      <CommandGroup>
                        {departments.map((dpt) => (
                          <CommandItem
                            value={dpt.label}
                            key={dpt.id}
                            onSelect={() =>
                              form.setValue('departmentId', dpt.id)
                            }
                          >
                            {dpt.label}
                            <BsCheckLg
                              className={`ml-auto h-4 w-4 ${
                                dpt.id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              }`}
                            />
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
            name='titleId'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Title</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant='outline'
                        role='combobox'
                        className={`justify-between ${
                          !field.value && 'text-muted-foreground'
                        }`}
                      >
                        {field.value
                          ? titles.find((title) => title.id === field.value)
                              ?.titlename
                          : 'Select a title'}
                        <PiCaretUpDownBold className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0 max-h-60 overflow-y-auto'>
                    <Command>
                      <CommandInput placeholder='Search Title...' />
                      <CommandEmpty>No Title found.</CommandEmpty>
                      <CommandGroup>
                        {titles.map((title) => (
                          <CommandItem
                            value={title.titlename}
                            key={title.id}
                            onSelect={() => form.setValue('titleId', title.id)}
                          >
                            {title.titlename}
                            <BsCheckLg
                              className={`ml-auto h-4 w-4 ${
                                title.id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              }`}
                            />
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
            name='role'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Role</FormLabel>
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
                          ? UserRoles.find((role) => role === field.value)
                          : 'Select a role'}
                        <PiCaretUpDownBold className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandInput placeholder='Search a role...' />
                      <CommandEmpty>No role found.</CommandEmpty>
                      <CommandGroup>
                        {UserRoles.map((role, i) => (
                          <CommandItem
                            value={role}
                            key={i}
                            onSelect={() => {
                              form.setValue('role', role);
                            }}
                          >
                            <BsCheckLg
                              className={cn(
                                'mr-2 h-4 w-4',
                                role === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {role}
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
          <div className='flex justify-end'>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </DialogWrapper>
  );
};

export default EditUser;

// 'use client';

// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import DialogWrapper from '@/components/Common/DialogWrapper';
// import { UserRoles } from '@/lib/dummy-data';
// import toast from 'react-hot-toast';
// import { IoPencil } from 'react-icons/io5';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
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
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { PiCaretUpDownBold } from 'react-icons/pi';
// import { BsCheckLg } from 'react-icons/bs';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { User } from '@prisma/client';
// import { cn } from '@/lib/utils';

// type EditUserProps = {
//   user: User;
//   onUpdate: (updatedUser: User) => void;
// };

// const EditUser = ({ user, onUpdate }: EditUserProps) => {
//   const [open, setOpen] = useState(false);
//   const [departments, setDepartments] = useState<
//     { id: string; label: string }[]
//   >([]);
//   const [titles, setTitles] = useState<{ id: string; titlename: string }[]>([]);
//   const router = useRouter();

//   const formSchema = z.object({
//     id: z.string(),
//     phone: z.string().max(50),
//     departmentId: z.string(),
//     titleId: z.string(),
//     role: z.string(),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       id: user.id,
//       phone: user.phone as string,
//       departmentId: user.departmentId as string,
//       titleId: user.titleId as string,
//       role: user.role,
//     },
//   });

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const res = await fetch('/api/department');
//         if (!res.ok) {
//           throw new Error('Failed to fetch departments');
//         }
//         const data = await res.json();
//         setDepartments(data);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//         toast.error('Error fetching departments');
//       }
//     };

//     const fetchTitles = async () => {
//       try {
//         const res = await fetch('/api/orgn-title');
//         if (!res.ok) {
//           throw new Error('Failed to fetch titles');
//         }
//         const data = await res.json();
//         setTitles(data);
//       } catch (error) {
//         console.error('Error fetching titles:', error);
//         toast.error('Error fetching titles');
//       }
//     };

//     fetchDepartments();
//     fetchTitles();
//   }, []);

//   async function submitEditUser(values: z.infer<typeof formSchema>) {
//     try {
//       const res = await fetch(`/api/user/${values.id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         toast.success('User information updated ', { duration: 8000 });
//         onUpdate(data.user);
//         setOpen(false);
//         router.refresh();
//       } else {
//         const errorMessage = await res.text();
//         toast.error(`An error occurred ${errorMessage}`, { duration: 6000 });
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//       toast.error('An Unexpected error occurred');
//     }
//   }

//   const roleKeys = Object.keys(UserRoles) as Array<keyof typeof UserRoles>;

//   return (
//     <DialogWrapper
//       title='Edit User'
//       icon={IoPencil}
//       isBtn={false}
//       open={open}
//       setOpen={() => setOpen(!open)}
//     >
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(submitEditUser)}
//           className='space-y-8'
//         >
//           <FormField
//             control={form.control}
//             name='phone'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Phone' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name='departmentId'
//             render={({ field }) => (
//               <FormItem className='flex flex-col'>
//                 <FormLabel>Department</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant='outline'
//                         role='combobox'
//                         className={`justify-between ${
//                           !field.value && 'text-muted-foreground'
//                         }`}
//                       >
//                         {field.value
//                           ? departments.find((dpt) => dpt.id === field.value)
//                               ?.label
//                           : 'Select a department'}
//                         <PiCaretUpDownBold className='ml-2 h-4 w-4 shrink-0 opacity-50' />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className='w-[200px] p-0 max-h-60 overflow-y-auto'>
//                     <Command>
//                       <CommandInput placeholder='Search Department...' />
//                       <CommandEmpty>No Department found.</CommandEmpty>
//                       <CommandGroup>
//                         {departments.map((dpt) => (
//                           <CommandItem
//                             value={dpt.label}
//                             key={dpt.id}
//                             onSelect={() =>
//                               form.setValue('departmentId', dpt.id)
//                             }
//                           >
//                             {dpt.label}
//                             <BsCheckLg
//                               className={`ml-auto h-4 w-4 ${
//                                 dpt.id === field.value
//                                   ? 'opacity-100'
//                                   : 'opacity-0'
//                               }`}
//                             />
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
//             name='titleId'
//             render={({ field }) => (
//               <FormItem className='flex flex-col'>
//                 <FormLabel>Title</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant='outline'
//                         role='combobox'
//                         className={`justify-between ${
//                           !field.value && 'text-muted-foreground'
//                         }`}
//                       >
//                         {field.value
//                           ? titles.find((title) => title.id === field.value)
//                               ?.titlename
//                           : 'Select a title'}
//                         <PiCaretUpDownBold className='ml-2 h-4 w-4 shrink-0 opacity-50' />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className='w-[200px] p-0 max-h-60 overflow-y-auto'>
//                     <Command>
//                       <CommandInput placeholder='Search Title...' />
//                       <CommandEmpty>No Title found.</CommandEmpty>
//                       <CommandGroup>
//                         {titles.map((title) => (
//                           <CommandItem
//                             value={title.titlename}
//                             key={title.id}
//                             onSelect={() => form.setValue('titleId', title.id)}
//                           >
//                             {title.titlename}
//                             <BsCheckLg
//                               className={`ml-auto h-4 w-4 ${
//                                 title.id === field.value
//                                   ? 'opacity-100'
//                                   : 'opacity-0'
//                               }`}
//                             />
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
//             name='role'
//             render={({ field }) => (
//               <FormItem className='flex flex-col'>
//                 <FormLabel>Role</FormLabel>
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
//                           ? UserRoles.find((role) => role === field.value)
//                           : 'Select a role'}
//                         <PiCaretUpDownBold className='ml-2 h-4 w-4 shrink-0 opacity-50' />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className='w-[200px] p-0'>
//                     <Command>
//                       <CommandInput placeholder='Search a role...' />
//                       <CommandEmpty>No role found.</CommandEmpty>
//                       <CommandGroup>
//                         {UserRoles.map((role, i) => (
//                           <CommandItem
//                             value={role}
//                             key={i}
//                             onSelect={() => {
//                               form.setValue('role', role);
//                             }}
//                           >
//                             <BsCheckLg
//                               className={cn(
//                                 'mr-2 h-4 w-4',
//                                 role === field.value
//                                   ? 'opacity-100'
//                                   : 'opacity-0'
//                               )}
//                             />
//                             {role}
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
//           <div className='flex justify-end'>
//             <Button type='submit'>Save Changes</Button>
//           </div>
//         </form>
//       </Form>
//     </DialogWrapper>
//   );
// };

// export default EditUser;
