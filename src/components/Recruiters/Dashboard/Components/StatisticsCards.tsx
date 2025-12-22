import StatisticsCard from "./StatisticCard";

export default function StatisticsCards() {

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
                <StatisticsCard title="New candidates to review" bgColor="bg-[#4640DE]" />
            </section>

            <section className={cardWidthClasses}>
                <StatisticsCard title="Candidates reviewed today" bgColor="bg-[#56CDAD]" />
            </section>

            <section className={cardWidthClasses}>
                <StatisticsCard title="Jobs Opened" bgColor="bg-[#26A4FF]" />
            </section>

        </div>
    );
}