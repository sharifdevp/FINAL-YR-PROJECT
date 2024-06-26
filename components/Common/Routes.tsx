import {
  HiMiniComputerDesktop,
  HiOutlineCog6Tooth,
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiOutlineUserCircle,
} from 'react-icons/hi2';
// import { FaRegListAlt } from 'react-icons/fa';
import { FiList } from 'react-icons/fi';
import {
  HiOutlineOfficeBuilding,
  HiOutlineIdentification,
} from 'react-icons/hi';
import { FaBuilding } from 'react-icons/fa';
import { MdBusiness } from 'react-icons/md';

// import { MdOutlineCategory } from 'react-icons/md';
// import { BiCategory } from 'react-icons/bi';
// import { AiOutlineTags } from 'react-icons/ai';
// import { RiFileList3Line } from 'react-icons/ri';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaUserTag } from 'react-icons/fa';
import { RiContactsLine } from 'react-icons/ri';

import { RiCalendarEventLine } from 'react-icons/ri';
import { MdOutlineBalance } from 'react-icons/md';
import { TbListCheck, TbListDetails } from 'react-icons/tb';
// import { IoPeopleCircleOutline } from 'react-icons/io5';

import { IoBusiness } from 'react-icons/io5';

export const AdminRoutes = [
  { title: 'Portal', url: '/portal', icon: HiMiniComputerDesktop },
  { title: 'Dashboard', url: '/dashboard/', icon: HiOutlineSquares2X2 },
  { title: 'Balances', url: '/dashboard/balances', icon: MdOutlineBalance },
  { title: 'Leaves', url: '/dashboard/leaves', icon: TbListCheck },
  {
    title: 'Leave Types',
    url: '/dashboard/leave-types',
    icon: FiList,
  },
  { title: 'Users', url: '/dashboard/users', icon: HiOutlineUserGroup },
  {
    title: 'Events',
    url: '/dashboard/events',
    icon: RiCalendarEventLine,
  },
  {
    title: 'Departments',
    url: '/dashboard/departments',
    // icon: HiOutlineOfficeBuilding,
    icon: IoBusiness,
  },
  {
    title: 'Job Titles',
    url: '/dashboard/orgn-titles',
    // icon: HiOutlineIdentification,
    icon: FaUserTag,
  },
];

export const UserRoutes = [
  {
    title: 'Profile',
    url: '/portal/profile',
    icon: HiOutlineUserCircle,
  },
  { title: 'Portal', url: '/portal', icon: HiMiniComputerDesktop },
  { title: 'History', url: '/portal/history', icon: TbListCheck },
];

export const ModeratorRoutes = [
  { title: 'Portal', url: '/portal', icon: HiMiniComputerDesktop },
  { title: 'Dashboard', url: '/dashboard/', icon: HiOutlineSquares2X2 },
  { title: 'Balances', url: '/dashboard/balances', icon: MdOutlineBalance },
  { title: 'Leaves', url: '/dashboard/leaves', icon: TbListCheck },
  {
    title: 'Leave Types',
    url: '/dashboard/leave-types',
    icon: FiList,
  },
  { title: 'Users', url: '/dashboard/users', icon: HiOutlineUserGroup },
  {
    title: 'Events',
    url: '/dashboard/events',
    icon: RiCalendarEventLine,
  },
  {
    title: 'Events',
    url: '/dashboard/events',
    icon: HiOutlineCog6Tooth,
  },
];
