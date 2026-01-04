import React, { useEffect, useState } from 'react';
import { Eye, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getJobApplicationStatistics, getJobViewStatistics } from '@/services/companyDashboardService';

const timeFilters = ['Week', 'Month', 'Year'];
const chartTabs = ['Job Views', 'Job Applications'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 text-white p-2 rounded-lg text-xs shadow-xl">
                {payload.map((p: any, index: number) => (
                    <div key={index} className="flex justify-between items-center space-x-2 my-1">
                        <span style={{ color: p.color }}>{p.value.toLocaleString()}</span>
                        <span className="text-gray-400">{p.name}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

interface MetricCardProps {
    data: { title: string; count: number; change: number; icon: React.ReactNode };
    timeFrame: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ data, timeFrame }) => {
    const isPositive = data.change >= 0;
    const arrow = isPositive ? '▲' : '▼';
    const colorClass = isPositive ? 'text-green-500' : 'text-red-500';

    return (
        <article className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-40">
            <p className="text-xl font-bold text-[#25324B] flex justify-between items-center mb-1">
                {data.title}
                <span className="p-2 bg-[#E9EBFD] rounded-full">{data.icon}</span>
            </p>
            <p className="text-3xl sm:text-5xl text-[#25324B] mb-1">{data.count.toLocaleString()}</p>
            <p className={"text-lg font-bold text-[#7C8493]"}>
                {timeFrame} <span className={`text-base font-bold ${colorClass}`}>{Math.abs(data.change).toFixed(1)}% {arrow}</span>
            </p>
        </article>
    );
};

export default function JobStatisticsChart() {
    const [activeFilter, setActiveFilter] = useState(timeFilters[0]);
    const [activeTab, setActiveTab] = useState(chartTabs[0]);
    const [jobViewsStats, setJobViewsStats] = useState<any>(null);
    const [jobAppsStats, setJobAppsStats] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [viewsRes, appsRes] = await Promise.all([
                    getJobViewStatistics(activeFilter),
                    getJobApplicationStatistics(activeFilter)
                ]);
                setJobViewsStats(viewsRes.data.data);
                setJobAppsStats(appsRes.data.data);
            } catch (err) {
                console.error("Dashboard Stats Fetch Error:", err);
            }
        };
        fetchStats();
    }, [activeFilter]);

    // Card Data Mappers
    const jobViewsCardData = jobViewsStats && {
        title: jobViewsStats.cardData.title,
        count: jobViewsStats.cardData.currentCount,
        change: jobViewsStats.cardData.change,
        icon: <Eye size={18} className="text-[#4640DE]" />
    };

    const jobAppsCardData = jobAppsStats && {
        title: jobAppsStats.cardData.title,
        count: jobAppsStats.cardData.currentCount,
        change: jobAppsStats.cardData.change,
        icon: <Briefcase size={18} className="text-[#4640DE]" />
    };

    // Determine which data array to pass to the chart
    const currentChartData = activeTab === 'Job Views' 
        ? jobViewsStats?.chartData 
        : jobAppsStats?.chartData;

    // Bar colors based on tab
    const barColors = activeTab === 'Job Views' 
        ? { current: "#4640DE", prev: "#CCCCFF" } 
        : { current: "#FFC93C", prev: "#FEE7A6" };

    const getTimeFilterButtonClass = (filter: string) => {
        const isActive = filter === activeFilter;
        return `text-xs font-light sm:text-base sm:font-semibold p-1 sm:p-3 m-1 transition-colors duration-200 rounded-lg ${isActive ? "bg-white" : "bg-transparent"}`;
    };

    const getTabButtonClass = (tab: string) => {
        const isActive = tab === activeTab;
        return `text-xs font-light sm:text-base sm:font-semibold py-2 px-3 sm:py-4 sm:px-6 transition-all duration-200 ${isActive ? "text-[#4640DE] border-b-2 border-[#4640DE]" : "text-[#7C8493] border-b-2 border-transparent"}`;
    };

    return (
        <div className="m-8 border border-gray-200 rounded-xl shadow-lg bg-white">
            <header className="w-full flex items-center justify-between p-6">
                <div className="w-1/2">
                    <p className="text-lg sm:text-xl md:text-2xl font-light sm:font-medium md:font-semibold pb-1 text-[#25324B]">
                        Job Statistics
                    </p>
                    <p className="text-[10px] font-light sm:text-sm sm:font-normal text-[#7C8493]">
                        Showing comparison for {activeFilter}ly performance
                    </p>
                </div>
                <div className="flex justify-end w-max text-[#4640DE] bg-[#E9EBFD] rounded-lg">
                    {timeFilters.map((filter) => (
                        <button key={filter} className={getTimeFilterButtonClass(filter)} onClick={() => setActiveFilter(filter)}>
                            {filter}
                        </button>
                    ))}
                </div>
            </header>

            <section>
                <nav className="flex border-b border-gray-200 px-6">
                    {chartTabs.map((tab) => (
                        <button key={tab} className={getTabButtonClass(tab)} onClick={() => setActiveTab(tab)}>
                            {tab}
                        </button>
                    ))}
                </nav>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <figure className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 min-h-96 w-full relative">
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={currentChartData || []}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                >
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        stroke="#7C8493"
                                        interval={0}
                                        tick={{ className: "text-[10px] font-light sm:text-sm md:text-base lg:text-lg sm:font-semibold text-[#25324B]" }}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                        wrapperStyle={{ paddingTop: '10px' }}
                                        formatter={(value) => (
                                            <span className="text-xs font-light sm:text-lg sm:font-semibold text-[#25324B] capitalize">{value} Period</span>
                                        )}
                                    />
                                    <Bar name="Previous" dataKey="previous" fill={barColors.prev} barSize={15} radius={[4, 4, 0, 0]} isAnimationActive={false} />
                                    <Bar name="Current" dataKey="current" fill={barColors.current} barSize={15} radius={[4, 4, 0, 0]} isAnimationActive={false} />
                                </BarChart>
                            </ResponsiveContainer>
                            
                            {!currentChartData && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/60 text-[#7C8493] font-semibold">
                                    Loading {activeTab} Data...
                                </div>
                            )}
                        </div>
                    </figure>

                    <aside className="lg:col-span-1 space-y-4">
                        {jobViewsCardData && (
                            <MetricCard data={jobViewsCardData} timeFrame={`This ${activeFilter}`} />
                        )}
                        {jobAppsCardData && (
                            <MetricCard data={jobAppsCardData} timeFrame={`This ${activeFilter}`} />
                        )}
                    </aside>
                </div>
            </section>
        </div>
    );
}