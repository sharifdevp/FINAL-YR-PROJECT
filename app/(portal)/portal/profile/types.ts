// types.ts
import { Role } from '@prisma/client';
export interface UserDetails {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: Role;
  phone: string | null;
  titleName: string | null;
  departmentName: string | null;
  birthName: string | null;
  departmentId: string | null;
  titleId: string | null;
  manager: string | null;
  onLeave: boolean;
  createdAt: Date;
}
