import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

import jobsBackup from "data/jobs.json";
import JobCollection from "@c./jobs/JobCollection";
import FirebaseContext from "context/firebaseContext";

let ResetJobs: NextPage = () => {
  const { db } = useContext(FirebaseContext);

  const [jobs, setJobs] = useState<job[]>([]);

  useEffect(() => {
    if (db) {
      getDocs(collection(db, "jobs")).then((data) => {
        const jobData: job[] = [];
        data.forEach((each) => {
          jobData.push(each.data() as job);
        });
        setJobs(jobData);
      });
    }
  }, [db]);

  async function addJob() {
    if (db) {
      const jobsRef = collection(db, "jobs");

      for (let j = 11; j < jobs.length + 1; j++) {
        await deleteDoc(doc(jobsRef, j + ""));
      }

      jobsBackup.forEach(async function (each) {
        await setDoc(doc(jobsRef, each.job_post_uid), each);
      });
    }
  }

  return (
    <div>
      <JobCollection job_info={jobs} section_title="Jobs from Firebase" />

      <button onClick={addJob}>Reset Jobs</button>
    </div>
  );
};

export default ResetJobs;
