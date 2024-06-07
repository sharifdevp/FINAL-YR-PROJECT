'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EditProfile from './EditProfile';
import { Role } from '@prisma/client';

interface UserProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    role: Role;
    phone: string | null;
    title: string | null;
    manager: string | null;
    department: string | null;
  }[];
}

const ProfileTable = ({ user }: UserProps) => {
  const [updatedImages, setUpdatedImages] = useState<{ [id: string]: string }>(
    {}
  );

  const handleImageUpdate = (userId: string, newImage: string) => {
    setUpdatedImages((prevState) => ({
      ...prevState,
      [userId]: newImage,
    }));
  };

  return (
    <div className='flex flex-col items-center gap-8 min-h-screen p-4 overflow-hidden'>
      {user.map((userData) => (
        <div
          key={userData.id}
          className='w-full max-w-4xl p-8 border border-gray-200 rounded-lg bg-white shadow-md'
        >
          <div className='flex items-center gap-4 mb-8'>
            <Avatar className='w-20 h-20'>
              {updatedImages[userData.id] ? (
                <AvatarImage
                  src={updatedImages[userData.id]}
                  alt={userData.name as string}
                />
              ) : userData.image ? (
                <AvatarImage
                  src={userData.image as string}
                  alt={userData.name as string}
                />
              ) : (
                <AvatarFallback>
                  {userData.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <h2 className='text-xl font-bold'>{userData.name}</h2>
          </div>
          <div className='flex justify-between gap-8'>
            <div className='flex-1 space-y-2'>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone}
              </p>
              <p>
                <strong>Department:</strong>{' '}
                <Badge variant='secondary'>{userData.department}</Badge>
              </p>
            </div>
            <div className='flex-1 space-y-2'>
              <p>
                <strong>Job Title:</strong>{' '}
                <Badge variant='secondary'>{userData.title}</Badge>
              </p>
              <p>
                <strong>Role:</strong>{' '}
                <Badge variant='secondary'>Regular {userData.role}</Badge>
              </p>
              <div className='flex items-center space-x-2'>
                <p>
                  <strong>Edit:</strong>
                </p>
                <EditProfile
                  user={userData}
                  onUpdateImage={handleImageUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileTable;
