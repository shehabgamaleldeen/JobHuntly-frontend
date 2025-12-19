import { Outlet } from "react-router-dom";
import JobCreateHeader from "./Components/JobCreateHeader";

export default function JobCreateLayout() {
    return (
        <div className="job-create-layout p-2 md:p-4 lg:p-8">
            <JobCreateHeader />
            <Outlet />
        </div>
    );
}
