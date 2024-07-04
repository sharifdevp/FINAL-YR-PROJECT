import Container from "@/components/Common/Container";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { MonthDateRangePicker } from "./MonthDateRangePicker";
import StatsCards from "./StatsCards";

const Dashboard = () => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row py-6 items-center justify-between ">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <MonthDateRangePicker />
          <Link  href="dashboard/report">
          <Button>Reports</Button>
          </Link>
        </div>
      </div>
      <StatsCards />
    </Container>
  )
}

export default Dashboard