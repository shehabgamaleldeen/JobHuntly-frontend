import { useEffect, useState } from "react";
import StatisticsCard from "./StatisticCard";
import { getNewJobApplicationsCount, getOpenJobsCount, getReviewedJobApplicationsCount } from "@/services/companyDashboardService";

export default function StatisticsCards() {
    const [newCandidates, setNewCandidates] = useState(0)
    const [reviewedCandidates, setReviewedCandidates] = useState(0)
    const [jobsOpen, setJobsOpen] = useState(0)

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const [NewCandidates, ReviewedCandidates, JobsOpen] = await Promise.all([
                    getNewJobApplicationsCount(),
                    getReviewedJobApplicationsCount(),
                    getOpenJobsCount()
                ]);
                setNewCandidates(NewCandidates.data.data);
                setReviewedCandidates(ReviewedCandidates.data.data);
                setJobsOpen(JobsOpen.data.data);
            } catch (err) {
                console.error("Dashboard Cards Fetch Error:", err);
            }
        };
        fetchCards();
    }, []);

    const containerClasses = `
        flex flex-col items-center gap-4 mx-8
        sm:flex-row sm:flex-wrap sm:justify-evenly
        lg:flex-nowrap lg:justify-between lg:items-stretch
    `;

    const cardWidthClasses = `
        w-full
        sm:w-[calc(50%-1rem)]
        lg:w-[calc(50%-1rem)]
    `;

    return (
        <div className={containerClasses}>

            <section className={cardWidthClasses}>
                <StatisticsCard title="New candidates to review" bgColor="bg-[#4640DE]" count={newCandidates}/>
            </section>

            <section className={cardWidthClasses}>
                <StatisticsCard title="Candidates reviewed today" bgColor="bg-[#56CDAD]" count={reviewedCandidates}/>
            </section>

            <section className={cardWidthClasses}>
                <StatisticsCard title="Jobs Opened" bgColor="bg-[#26A4FF]" count={jobsOpen}/>
            </section>

        </div>
    );
}