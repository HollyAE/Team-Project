import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

import { GenericSection } from "@cv/sections";
import Header from "@c./profile/ProfileHeader";

import FirebaseContext from "context/firebaseContext";
import { useCVDoc, useUserDoc } from "hooks";

let Skills: NextPage = () => {
  const [firstName, setFirstName] = useState("");
  const [verified, setVerified] = useState(false);

  let { user } = useContext(FirebaseContext);

  const userDoc = useUserDoc();

  useEffect(() => {
    if (userDoc?.firstName) {
      setFirstName(userDoc.firstName);
    }
  }, [userDoc]);

  const [qualities, setQualities] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const cvDoc = useCVDoc();

  useEffect(() => {
    if (cvDoc?.skills) {
      setSkills(cvDoc.skills);
    }

    if (cvDoc?.qualities) {
      setQualities(cvDoc.qualities);
    }
  }, [cvDoc]);

  useEffect(() => {
    setVerified(user?.emailVerified!);
  }, [user]);

  return (
    <>
      <Header
        active="skills"
        firstName={firstName}
        fnamebackup={firstName}
        verified={verified}
      />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="px-20 md:col-span-6">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                My Skills
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                View and edit your skills
              </p>
            </div>
          </div>
          <div className="mt-5 px-10 md:col-span-6 md:mt-0">
            <div>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-4 w-full">
                  <div className="grid grid-cols-6 gap-6 w-full">
                    <div
                      id="qualities"
                      className="col-span-6 sm:col-span-4 w-[95vw]"
                    >
                      <label className="block text-sm font-medium text-gray-700">
                        Soft Skills
                      </label>
                      <GenericSection
                        name="Soft Skills"
                        selected={qualities}
                        setSelected={setQualities}
                        description="Soft skills, also known as power skills, common skills or core skills, are skills applicable to all professions."
                        examples={["Teamwork", "Communication"]}
                        firebaseField="qualities"
                      />
                    </div>

                    <div
                      id="skills"
                      className="col-span-6 sm:col-span-4 w-[95vw]"
                    >
                      <label className="block text-sm font-medium text-gray-700">
                        Hard Skills
                      </label>
                      <GenericSection
                        name="Hard Skills"
                        apiURL="https://europe-west2-bobbleapp.cloudfunctions.net/getSkills"
                        selected={skills}
                        setSelected={setSkills}
                        description="Hard skills are specific abilities, or capabilities, that an individual can possess and demonstrate in a measured way."
                        examples={["Python Programming", "Bookkeeping"]}
                        firebaseField="skills"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
};

export default Skills;
