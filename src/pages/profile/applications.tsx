import { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import Header from "@c./profile/ProfileHeader";
import FirebaseContext from "context/firebaseContext";
import { useJobs, useUserDoc } from "hooks";

let TrackApplications: NextPage = ({}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [verified, setVerified] = useState(false);
  const [applied, setApplied] = useState(Array<string>);
  const uniqueNames = Array.from(new Set(applied));

  let { user } = useContext(FirebaseContext);

  useEffect(() => {
    setVerified(user?.emailVerified!);
  }, [user]);

  const jobs = useJobs();

  function filterJob(uid: string) {
    return jobs.filter((x) => x.job_post_uid == uid)[0] as job;
  }

  const userDoc = useUserDoc();

  useEffect(() => {
    if (userDoc?.firstName) {
      setFirstName(userDoc.firstName);
    }

    if (userDoc?.lastName) {
      setLastName(userDoc.lastName);
    }

    if (userDoc?.dateOfBirth) {
      setDOB(userDoc.dateOfBirth);
    }

    if (userDoc?.applied) {
      setApplied(userDoc.applied);
    }
  }, [userDoc]);

  return (
    <>
      <Header
        active="applications"
        verified={verified}
        firstName={firstName}
        fnamebackup={firstName}
      />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="bold text-2xl ml-20">Applications in progress</div>

      <div
        className="mt-4 ml-32 flex-box rounded-3xl border-gray-50 border-4 h-3/4 w-4/5 overflow-x-hidden"
        style={{ justifyContent: "center" }}
      >
        <ul className="flex flex-wrap justify-center overflow-hidden gap-4 p-2">
          {uniqueNames.map((uid) => (
            <li key={uid} className="p-2 text-gray-700">
              <div className="bg-white rounded-3xl border border-gray-600 w-80 h-72 overflow-hidden">
                <div className="p-4 flex items-center">
                  <Image
                    src={filterJob(uid).companyImage}
                    width="80"
                    height="80"
                    alt="Company IMG"
                    className="bg-white rh-50 w-50 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-bold">{filterJob(uid).jobTitle}</div>
                    <div className="text-sm">{filterJob(uid).companyName}</div>
                  </div>
                </div>
                <div className="bg-gray-400 h-1 rounded-full mx-10 mb-2"></div>
                <div className="h-2/5 overflow-hidden overflow-y-scroll ml-4 mr-4 bg-gray-200 rounded-lg p-2">
                  <div className=" ">{filterJob(uid).jobDescription}</div>
                </div>
                <div className="flex mt-2 font-bold text-l justify-center">
                  Status:
                  <div className=" ml-2 text-l font-bold text-green-600">
                    Accepted
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* (useModal(<ApplicationModal job={job}>)) */}

      {/* <button onClick={useModal(<ApplicationModal job={info} />)}></button> */}
    </>
  );
};

export default TrackApplications;
