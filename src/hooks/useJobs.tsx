import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/firebaseContext";

function useJobs() {
  const { db } = useContext(FirebaseContext);

  const [jobs, setJobs] = useState<job[]>([]);

  async function getJobs() {
    if (db) {
      const data = await getDocs(collection(db, "jobs"));
      const jobData: job[] = [];
      data.forEach((each) => {
        jobData.push(each.data() as job);
      });
      setJobs(jobData);
    }
  }

  useEffect(() => {
    getJobs();
  }, []);

  return jobs;
}

export default useJobs;
