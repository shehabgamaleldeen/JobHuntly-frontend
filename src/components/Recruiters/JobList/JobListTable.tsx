import React from "react";
import type { Job } from "./JobListPage";

interface Props {
  data: Job[];
}

const JobTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg w-full max-w-[1104px]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-white border-b border-[#D6DDEB]">
            <tr className="text-[#7C8493] text-sm">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Date Posted</th>
              <th className="py-3 px-4 text-left">Due Date</th>
              <th className="py-3 px-4 text-left">Job Type</th>
              <th className="py-3 px-4 text-left">Applicants</th>
            </tr>
          </thead>

          <tbody>
            {data.map((job, index) => (
              <tr
                key={job._id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#F4F4FD]"}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{job.title}</td>
                <td className="py-3 px-4">{job.status}</td>
                <td className="py-3 px-4">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {job.dueDate
                    ? new Date(job.dueDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-3 px-4">{job.jobType}</td>
                <td className="py-3 px-4">{job.applicantsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable;
