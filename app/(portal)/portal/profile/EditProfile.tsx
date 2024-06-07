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
import { User } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@/lib/uploadthing';

type EditUserProps = {
  user: User;
  onUpdateImage: (userId: string, newImage: string) => void;
};

const EditProfile = ({ user, onUpdateImage }: EditUserProps) => {
  const [open, setOpen] = useState(false);
  const [newImage, setNewImage] = useState<string | null>(null);
  const router = useRouter();

  const formSchema = z.object({
    phone: z.string().max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: user.phone as string,
    },
  });

  async function SubmitEditUser(values: z.infer<typeof formSchema>) {
    const id = user.id;
    try {
      const res = await fetch('/api/user-profile/profileId', {
        method: 'PATCH',
        body: JSON.stringify({ ...values, id, image: newImage }),
      });

      if (res.ok) {
        toast.success('Profile updated Successfully', { duration: 10000 });
        onUpdateImage(user.id, newImage as string);
        setOpen(false);
        router.refresh();
      } else {
        const errorMessage = await res.text();
        toast.error(`An error occurred ${errorMessage}`, { duration: 10000 });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An Unexpected error occurred');
    }
  }

  return (
    <DialogWrapper
      title='Edit Profile'
      icon={IoPencil}
      isBtn={false}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(SubmitEditUser)}
          className='space-y-8'
        >
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Profile Image
            </label>
            <div className='mt-1 flex items-center'>
              {newImage ? (
                <img
                  src={newImage}
                  alt='New Profile'
                  className='w-24 h-24 rounded-full' // Increased size
                />
              ) : (
                user.image && (
                  <img
                    src={user.image}
                    alt={user.name as string}
                    className='w-24 h-24 rounded-full' // Increased size
                  />
                )
              )}
              <UploadButton
                endpoint='profilePicture'
                onClientUploadComplete={(res) => {
                  // Update the newImage state with the uploaded image URL
                  if (res && res.length > 0) {
                    setNewImage(res[0].url);
                  }
                  toast.success('Upload Completed');
                }}
                onUploadError={(error: Error) => {
                  // Handle the error.
                  toast.error(`ERROR! ${error.message}`);
                }}
                className='ml-5 p-2 text-gray-700 bg-white border border-gray-300 rounded' // Adjust button size and color
              />
            </div>
          </div>

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

          <Button type='submit'>Update</Button>
        </form>
      </Form>
    </DialogWrapper>
  );
};

export default EditProfile;
