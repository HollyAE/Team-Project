import { FC, useState } from "react";

import { useModal, useUserDoc } from "hooks";

interface Props {
  job?: job;
  applyFunction?: (job_post_uid: string) => void;
}

const JobModal: FC<Props> = ({ job, applyFunction }) => {
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const userDoc = useUserDoc();

  const close = useModal(<div />);

  if (!job) return <div />;

  return (
    <div className="bg-blue-600 bg-opacity-10 backdrop-blur-sm w-full h-full fixed items-center justify-center flex">
      <div className="w-full h-full" onClick={close}></div>
      <div className="flex-box absolute bg-gray-800 rounded-3xl border border-black w-3/5 md:w-2/3 lg:w-1/2 h-3/4 overflow-hidden">
        <h1 className="w-full pb-10">
          <div className="sticky flex justify-between m-4">
            <p className="text-bold text-white text-3xl">
              {job.jobTitle} {userDoc?.email}
            </p>
            <button className="text-bold text-white text-2xl" onClick={close}>
              <svg
                className="svg-icon text-white h-12 w-12 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
              </svg>
            </button>
          </div>
        </h1>
        <div className="flex justify-center items-center">
          <img
            src={job.companyImage}
            width="120"
            height="120"
            alt=""
            className="bg-white rh-50 w-50 rounded-full"
          />
        </div>
        <p className="py-1 text-xl text-white text-center">
          {job.companyName} t
        </p>
        <hr className="w-80 h-1 mx-auto my-2 bg-gray-100 border-0 rounded" />

        <div className="grid grid-rows-2 grid-cols-1 md:grid-cols-2 gap-x-6 m-6 text-left overflow-hidden">
          <div className="rounded-lg bg-gray-500 h-70 overflow-y-scroll no-scrollbar">
            <div
              className={`rounded-lg bg-gray-500 h-70 overflow-y-scroll no-scrollbar ${
                showCompanyInfo ? "hidden" : ""
              }`}
            >
              <p className="text-white text-l p-2">{job.jobDescription}</p>
            </div>
            <div
              className={`rounded-lg bg-gray-500 h-70 overflow-y-scroll ${
                showCompanyInfo ? "" : "hidden"
              }`}
            >
              <p className="text-white text-l p-2">{job.companyName}</p>
            </div>
          </div>
          <div className="text-white text-lg font-bold mt-6 md:mt-0">
            <p className="">Location: {job.jobLocation.postCode}</p>
            <p className="">
              Salary: £{job.amount}/{job.paymentInterval}
            </p>
            <p className="">Contract Type: {job.typeOfEmployment}</p>
            <p className="">Categories:</p>
            <div className="h-12 overflow-auto">
              <ul className="flex flex-wrap gap-2">
                {job?.category?.map((category) => (
                  <li
                    key={category}
                    className="border border-white p-2 rounded"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex mt-6">
              <div className={` ${showCompanyInfo ? "hidden" : ""}`}>
                <button
                  className="p-4 rounded-bl-xl rounded-tl-xl border border-r-0 border-white"
                  onClick={() => setShowCompanyInfo(true)}
                >
                  Company Information
                </button>
              </div>
              <div className={` ${showCompanyInfo ? "" : "hidden"}`}>
                <button
                  className="p-4 rounded-bl-xl rounded-tl-xl border border-r-0 border-white flex"
                  onClick={() => setShowCompanyInfo(false)}
                >
                  Position Information
                </button>
              </div>

              <button
                className="bg-green-500 rounded-br-xl rounded-tr-xl p-4"
                onClick={() => {
                  applyFunction!(job.job_post_uid);
                  close();
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
