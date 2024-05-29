import Container from "@/components/Common/Container";
import TableWrapper from "../../../../components/Common/TableWrapper";
import HistoryTable from "./HistoryTable";

import { getUserLeaveDays } from "@/lib/data/getLeaveDays";
import { Leave } from "@prisma/client";

const UserHistory = async () => {
  const leaveHistory = await getUserLeaveDays()

  if (leaveHistory === null) {
    return <Container>Loading...</Container>;
  }
  return (
    <Container>
      <TableWrapper title="My Leave History">
        <HistoryTable history={leaveHistory as  Leave[]} />
      </TableWrapper>
    </Container>
  );
};

export default UserHistory;