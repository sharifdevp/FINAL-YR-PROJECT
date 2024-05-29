import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import dayjs from 'dayjs';
import { formatDistance, subDays } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Leave, LeaveStatus } from '@prisma/client';
import EditLeave from './EditLeave';

type leaveProps = {
  leaves: Leave[];
};

const LeavesTable = ({ leaves }: leaveProps) => {
  return (
    <Table>
      <TableHeader className='whitespace-nowrap'>
        <TableRow>
          <TableHead>Staff Name</TableHead>
          <TableHead>Leave Type</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Requested On</TableHead>
          <TableHead>Period</TableHead>
          <TableHead>No. Of Days</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Requester Note</TableHead>
          <TableHead>Attached File</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Approved At</TableHead>
          <TableHead>Approver Note</TableHead>
          <TableHead className='text-right'>Approved By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='whitespace-nowrap'>
        {leaves.map((leave) => (
          <TableRow key={leave.id}>
            <TableCell className='font-medium'>{leave.userName}</TableCell>
            <TableCell className='font-medium'>{leave.type}</TableCell>
            <TableCell className='font-medium'>{leave.year}</TableCell>
            <TableCell className='font-medium'>
              {dayjs(leave.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </TableCell>
            <TableCell className='flex font-medium'>
              <span>{dayjs(leave.startDate).format('DD/MM/YYYY')} </span> -{' '}
              <span>{dayjs(leave.endDate).format('DD/MM/YYYY')} </span>{' '}
            </TableCell>
            <TableCell>{leave.days}</TableCell>
            <TableCell className=''>
              <Badge
                className={`
                ${leave.status === LeaveStatus.APPROVED && 'bg-green-500'} 
                ${leave.status === LeaveStatus.PENDING && 'bg-amber-500'} 
                ${leave.status === LeaveStatus.REJECTED && 'bg-red-500'} 
                ${leave.status === LeaveStatus.INMODERATION && 'bg-indigo-500'} 
                `}
              >
                {' '}
                {leave.status}
              </Badge>{' '}
            </TableCell>
            <TableCell>{leave.userNote}</TableCell>
            <TableCell className='font-medium'>
              {leave.fileContent ? (
                <a
                  href={
                    Buffer.isBuffer(leave.fileContent)
                      ? `data:application/pdf;base64,${leave.fileContent.toString(
                          'base64'
                        )}`
                      : leave.fileContent
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View File
                </a>
              ) : (
                'No file uploaded'
              )}
            </TableCell>
            <TableCell className='font-medium'>
              {leave.status !== LeaveStatus.APPROVED && (
                <EditLeave
                  id={leave.id}
                  days={leave.days}
                  type={leave.type}
                  year={leave.year}
                  email={leave.userEmail}
                  user={leave.userName}
                  startDate={leave.startDate}
                />
              )}
            </TableCell>
            <TableCell className=''>
              {formatDistance(
                subDays(new Date(leave.updatedAt), 0),
                new Date(),
                { addSuffix: true }
              )}
            </TableCell>
            <TableCell className=''>{leave.moderatorNote}</TableCell>
            <TableCell className='text-right'>{leave.moderator}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeavesTable;
