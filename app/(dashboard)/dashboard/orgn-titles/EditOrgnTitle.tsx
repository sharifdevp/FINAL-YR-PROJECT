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
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type EditOrgnTitleProps = {
  id: string;
  titlename: string;
  description: string;
};

const EditOrgnTitle = ({ id, titlename, description }: EditOrgnTitleProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    titlename: z.string().min(1, 'Title name is required'),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titlename: titlename,
      description: description || '',
    },
  });

  async function SubmitEditOrgnTitle(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`/api/orgn-title/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success('Employee title edited', { duration: 8000 });
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
      title='Edit Employee Title'
      icon={IoPencil}
      isBtn={false}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(SubmitEditOrgnTitle)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='titlename'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Name</FormLabel>
                <FormControl>
                  <Input placeholder='Titlename' {...field} />
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
          <Button type='submit'>Save changes</Button>
        </form>
      </Form>
    </DialogWrapper>
  );
};

export default EditOrgnTitle;

// 'use client';

// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import DialogWrapper from '@/components/Common/DialogWrapper';
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
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// type EditOrgnTitleProps = {
//   id: string;
//   titleName: string;
//   description: string;
// };

// const EditOrgnTitle = ({ id, titleName, description }: EditOrgnTitleProps) => {
//   const [open, setOpen] = useState(false);
//   const router = useRouter();

//   const formSchema = z.object({
//     titleName: z.string().min(1, 'Name is required'),
//     description: z.string().optional(),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       titleName,
//       description,
//     },
//   });

//   async function SubmitEditOrgnTitle(values: z.infer<typeof formSchema>) {
//     try {
//       const res = await fetch(`/api/orgnTitle/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });

//       if (res.ok) {
//         toast.success('Title Edited Successfully', {
//           duration: 4000,
//         });
//         setOpen(false);
//         router.refresh();
//       } else {
//         const errorMessage = await res.text();
//         toast.error(`An error occurred: ${errorMessage}`, { duration: 6000 });
//       }
//     } catch (error) {
//       console.error('An error occurred:', error);
//       toast.error('An unexpected error occurred');
//     }
//   }

//   return (
//     <DialogWrapper
//       title='Edit Title'
//       icon={IoPencil}
//       isBtn={false}
//       open={open}
//       setOpen={() => setOpen(!open)}
//     >
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(SubmitEditOrgnTitle)}
//           className='space-y-8'
//         >
//           <FormField
//             control={form.control}
//             name='titleName'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Name' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name='description'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Description' {...field} />
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

// export default EditOrgnTitle;
