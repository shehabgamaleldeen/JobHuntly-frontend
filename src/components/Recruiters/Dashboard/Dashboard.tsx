import Greeting from "./Components/Greeting";
import JobStatisticsChart from "./Components/JobStatisticsChart";
import StatisticsCards from "./Components/StatisticsCards";

export default function Dashboard() {
    return (
        <>
            <div className="company-dashboard">
                <Greeting />
                <StatisticsCards />
                <JobStatisticsChart />
            </div>
        </>
    )
}