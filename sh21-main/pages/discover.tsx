import { NextPage } from "next";

import JobCollection from "@c./jobs/JobCollection";
import { useJobs } from "hooks";

let Discover: NextPage = () => {
  const data = useJobs();
  return (
    <div>
      <JobCollection
        job_info={data}
        section_title="Tourism Opportunities"
        category="Tourism"
      />
      <JobCollection job_info={data} section_title="Marketing Opportunities" />
      <JobCollection job_info={data} section_title="Technology Opportunities" />
      <JobCollection job_info={data} section_title="Remote Opportunities" />
      <JobCollection job_info={data} section_title="Sales Opportunities" />
    </div>
  );
};

export default Discover;
