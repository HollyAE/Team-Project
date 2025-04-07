import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

import JobCollection from "@c./jobs/JobCollection";
import FirebaseContext from "context/firebaseContext";

let GenerateJobs: NextPage = () => {
  const { db } = useContext(FirebaseContext);

  const [jobs, setJobs] = useState<job[]>([]);

  const [newJobs, setNewJobs] = useState<job[]>([]);

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

  async function addJob(job: job) {
    if (db) {
      const jobsRef = collection(db, "jobs");

      await setDoc(doc(jobsRef, job.job_post_uid), job);
    }
  }

  const FakeCompanies = {
    Gapple: [
      "hdjsyhdjqwoie",
      1,
      "NGO",
      "https://images.freeimages.com/images/previews/09e/moon-art-1641879.png",
      "Gapple",
      "www.gapple.com",
    ],
    Betflix: [
      "idsdskjnnjdsj",
      2,
      "Promotion",
      "https://previews.123rf.com/images/lumut/lumut1611/lumut161100710/67433997-mountain-logo.jpg",
      "Betflix",
      "www,betflix.com",
    ],
    Ficrosoft: [
      "lgopgfngfb",
      3,
      "Sales",
      "https://media.istockphoto.com/id/1140553971/vector/abstract-business-arrow-up-logo-icon-vector-design-template.jpg?s=612x612&w=0&k=20&c=N6bFWaKfmFokGSfTNJhEbYDnF1RplWomcNrOKI65cWU=",
      "Ficrosoft",
      "www.ficrosoft.com",
    ],
    Spyke: [
      "teweoijcnd",
      4,
      "Retail",
      "https://img.freepik.com/free-vector/letter-e-with-crown-logo-design_474888-1976.jpg?w=2000",
      "Spyke",
      "www.spyke.com",
    ],
    Macebook: [
      "plkdsdnsdnsd",
      5,
      "Cleaning",
      "https://seeklogo.com/images/C/copyright-symbol-logo-8BD7CD1E77-seeklogo.com.png",
      "Macebook",
      "www.macebook.com",
    ],
    Oogle: [
      "fdfsdjsajds",
      6,
      "Education",
      "https://previews.123rf.com/images/mehibi/mehibi1511/mehibi151100860/48317328-generic-logo-template.jpg",
      "Oogle",
      "www.oogle.com",
    ],
  };

  const FakeJobs = {
    StackDeveloper: [
      "Stack Developer",
      "A Full-Stack developer is a professional responsible for working on both front-end and back-end development processes. They design, develop, and maintain fully-fledged and functioning platforms with databases or servers. These servers do not need other third-party applications to build an entire system from scratch.",
    ],
    MediaPlanner: [
      "Media Planner",
      "Media planners produce action plans for advertising campaigns from pre-defined marketing objectives.",
    ],
    TeamMember: [
      "Team Member",
      "As a Team Member, you'll be responsible for making sure every customer has an unrivalled cinema experience. You'll be out there as the face of our company, meeting, greeting and providing a superior standard of service to our customers in the various offer areas. Whether selling tickets, selling freshly prepared popcorn or showing people to their seats, you and your team mates will ensure everyone has a great time in a safe and clean environment.",
    ],
    SalesAssistant: [
      "Sales Assistant",
      "The main objective of this role is to support store management team in achieving a store environment that fosters creativity, employee development and the VIBE philosophy. To uphold the our philosophy.",
    ],
    CreativeDirector: [
      "Creative Director",
      "Join us as part of our award-winning Contact Centre team in Glasgow as a Financial Assist Associate and you'll enjoy the freedom and support you need to make an impact. Building better financial futures for our customers whilst delivering exceptional customer service. Earn up to £24,160 per annum (depending on experience & based on working 40hrs per week). With bonus incentives on top.",
    ],
  };

  function generateNJobs(n: number) {
    var newJobs = [];
    for (let i = 0; i < n; i++) {
      let accepted = Math.floor(Math.random() * 10) + 1;
      let interests = Math.floor(Math.random() * 10);
      let matches = Math.floor(Math.random() * 10);

      let amount = Math.floor(Math.random() * 10) + "";
      let amountUpper = Math.floor(Math.random() * 10 + 10) + "";

      let amountOfPeople = Math.floor(Math.random() * 10) + "";
      let jobPostUID = jobs.length + i + 1;

      let shouldShowCompanyURL = true;

      let companyNo = Math.floor(Math.random() * 6);
      let companyData = [];
      switch (companyNo) {
        case 0:
          companyData = FakeCompanies.Betflix;
          break;
        case 1:
          companyData = FakeCompanies.Ficrosoft;
          break;
        case 2:
          companyData = FakeCompanies.Gapple;
          break;
        case 3:
          companyData = FakeCompanies.Macebook;
          break;
        case 4:
          companyData = FakeCompanies.Oogle;
          break;
        case 5:
          companyData = FakeCompanies.Spyke;
          break;
        default:
          companyData = FakeCompanies.Betflix;
      }

      let businessUserProfile = companyData[0] as string;
      let businessUserUID = companyData[1] as string;
      let typeOfIndustry = companyData[2] as IndustryTypes;
      let companyImage = companyData[3] as string;
      let companyName = companyData[4] as string;
      let companyURL = companyData[5] as string;

      let jobNo = Math.floor(Math.random() * 5);
      let jobData = [];
      switch (jobNo) {
        case 0:
          jobData = FakeJobs.CreativeDirector;
          break;
        case 1:
          jobData = FakeJobs.MediaPlanner;
          break;
        case 2:
          jobData = FakeJobs.SalesAssistant;
          break;
        case 3:
          jobData = FakeJobs.StackDeveloper;
          break;
        case 4:
          jobData = FakeJobs.TeamMember;
          break;
        default:
          jobData = FakeJobs.CreativeDirector;
      }

      let jobTitle = jobData[0] as string;
      let jobDescription = jobData[1] as string;

      let categories = [
        "Tourism",
        "Marketing",
        "Technology",
        "Remote",
        "Sales",
      ];
      let catarray = [];
      for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
        catarray.push(categories.pop());
      }

      let category = catarray as JobCategory[];

      var newJob: job = {
        accepted: accepted,
        interests: interests,
        matches: matches,
        amount: amount as string,
        amountUpper: amountUpper,
        paymentInterval: "Hour" as SalaryIntervals,
        salaryType: "Fixed",
        amountOfPeople: amountOfPeople,
        business_user_profile: businessUserProfile,
        business_user_uid: businessUserUID,
        job_post_uid: jobPostUID + "",
        typeOfIndustry: typeOfIndustry,
        customIndustry: "",
        companyImage: companyImage,
        companyName: companyName,
        companyURL: companyURL,
        shouldShowCompanyURL: shouldShowCompanyURL,
        typeOfEmployment: "Full Time" as EmploymentType,
        temporaryType: "",
        contractLength: 12,
        flexible: "No" as Flexible,
        jobLocation: null as unknown as Location,
        jobLocationType: "On Site" as JobLocationType,
        acceptAll: false,
        shouldShowCustomMessage: false,
        message: "Congratulations on being accepted!",
        jobTitle: jobTitle,
        jobDescription: jobDescription,
        source: "bobbll" as Sources,
        status: "Live" as Statuses,
        plan: "One" as Plans,
        requiredSkills: [],
        yearOfStudy: ["Undergraduate", "Masters"],
        video: "sample.mp4",
        thumbnail: "listing.png",
        category: category,
      };

      newJobs.push(newJob);
    }
    setNewJobs(newJobs);
  }

  async function deleteJob(id: string) {
    if (db) {
      const jobsRef = collection(db, "jobs");
      await deleteDoc(doc(jobsRef, id));
    }
  }

  const [rands, setRands] = useState(5);
  return (
    <div>
      <div className="text-3xl text-center">
        <h1>New Jobs Generator</h1>
        <input
          type="number"
          className="w-[50vw] mt-10"
          placeholder="Number of Jobs to Randomly Create"
          onChange={(e) => {
            setRands(e.target.value as unknown as number);
          }}
        ></input>
      </div>

      <button
        onClick={() => {
          generateNJobs(rands);
        }}
        className="rounded-xl p-10 bg-white text-black justify-center"
      >
        Generate Jobs
      </button>

      <div className="">
        <JobCollection
          job_info={newJobs}
          section_title={"Your Generated Jobs"}
          scrollable={true}
        />
      </div>

      <div>
        {newJobs.map((each, i) => {
          return (
            <button
              key={i}
              id={"add" + i}
              className="m-2 rounded-xl text-xl bg-green-500 text-white p-10 w-40"
              onClick={(e) => {
                var elem = document.getElementById("add" + i);
                if (elem?.innerHTML == "Add Job " + (i + 1)) {
                  elem.innerHTML = "Undo";
                  addJob(each);
                } else if (elem?.innerHTML == "Undo") {
                  elem.innerHTML = "Add Job " + (i + 1);
                  deleteJob(each.job_post_uid);
                }
              }}
            >
              Add Job {i + 1 + ""}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GenerateJobs;
