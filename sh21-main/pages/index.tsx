import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import JobCollection from "@c./jobs/JobCollection";

import { useJobs, useUpdateUserDoc, useUserDoc } from "hooks";

let Index: NextPage = () => {
  const data = useJobs();

  const updateUserDoc = useUpdateUserDoc();
  const userDoc = useUserDoc();

  const [applied, setApplied] = useState<string[]>([]);

  useEffect(() => {
    if (userDoc?.applied) {
      setApplied(userDoc.applied);
    }
  }, [userDoc]);

  function apply(job_post_uid: string) {
    updateUserDoc("applied", [...applied, job_post_uid]);
    setApplied([...applied, job_post_uid]);
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="">
        <JobCollection
          job_info={data}
          section_title="Hottest Entry Level Jobs"
          applyFunction={apply}
        />
      </div>

      <div className="flex flex-row justify-center items-center sm:w-full sm:h-full bg-blue-500">
        <div className="h-1/3 w-2/3 sm:w-auto sm:h-auto mt-4">
          <Image
            src="/happy-man.png"
            width={400}
            height={400}
            style={{ userSelect: "none" }}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-evenly  gap-6 sm:gap-10 text-center">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold">
              Build Your CV
            </h1>
            <h2 className="font-extrabold sm:text-xl">
              Get auto-matched today
            </h2>
          </div>

          <Link href="build-cv">
            <div className="flex items-center justify-center bg-white rounded-full text-center hover:scale-105 transition-all hover:font-bold">
              <h1 className="small:text-2xl small:mx-4 small:my-6 mx-2 my-4">
                Start Creating
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
