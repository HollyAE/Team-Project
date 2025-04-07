import { PDFDownloadLink } from "@react-pdf/renderer";
import { Dispatch, FC, SetStateAction } from "react";

import {
  EducationSection,
  ExperienceSection,
  GenericSection,
  ReferenceSection,
} from "@cv/sections";

import TextInput from "@cv/TextInput";
import { useUpdateCVDoc } from "hooks";

// Long CV is now referred to as Professional CV on the buttons
// Colourful CV is now referred to as Modern CV on the buttons

//todo
// stretch goals
// add optional fields for linkedIn / website etc
// add exam fields if school selected
// separate phone / email fields for reference contact deets

interface props {
  cvData: CV;
  setCvData: Dispatch<SetStateAction<CV>>;

  cvInstances: JSX.Element[];
  layoutOption: number;
  setLayoutOption: Dispatch<SetStateAction<number>>;
}

let CVBuilder: FC<props> = ({
  cvData,
  setCvData,
  cvInstances,
  layoutOption,
  setLayoutOption,
}) => {
  //Button styles for each layout option
  const buttonStyles = [
    "bg-gray-200",
    "bg-green-400",
    "bg-gradient-to-t from-bg-red-200 to-bg-green-300",
  ];

  //Update CV hook - Usage updateCV(fieldName, data)
  let updateCV = useUpdateCVDoc();

  // makes an updater function for sub values of the CV object
  // cannot do functional updates, but still extremely useful
  function updater(field: keyof CV) {
    return (x: any) =>
      setCvData((prev) => {
        return { ...prev, [field]: x };
      });
  }

  //Each component is explained further in their file. This is just a skeleton of components for the most part
  return (
    <div id="capture" suppressHydrationWarning={true} className="mt-10">
      <div id="aboutform" className="bg-white m-10  rounded-3xl p-5 min-h-full">
        <h1 className="text-xl x-small:text-2xl sm:text-3xl font-semibold mx-5">
          Lets take down some contact details
        </h1>
        <div className="invisible sm:visible h-0 sm:h-auto flex flex-row [&>*]:w-1/2 [&>*]:text-center [&>*]:m-5 [&>*]:rounded-2xl">
          <TextInput
            placeholder={"Forename"}
            setVariable={updater("fname")}
            variable={cvData.fname}
            firebaseField="fname"
          />
          <TextInput
            placeholder={"Surname"}
            setVariable={updater("sname")}
            variable={cvData.sname}
            firebaseField="sname"
          />
        </div>

        <div className="visible sm:invisible h-full sm:h-0 flex flex-row flex-wrap justify-center [&>*]:text-center mx-5 m-5 gap-5 sm:m-0 [&>*]:rounded-2xl">
          <TextInput
            placeholder={"Forename"}
            setVariable={updater("fname")}
            variable={cvData.fname}
            firebaseField="fname"
          />
          <TextInput
            placeholder={"Surname"}
            setVariable={updater("sname")}
            variable={cvData.sname}
            firebaseField="sname"
          />
        </div>

        <div className="mx-5 mb-5 bg-gray-200 text-gray-600 placeholder-gray-600 text-md x-small:text-xl sm:text-3xl text-center flex flex-row [&>*]:rounded-2xl rounded-2xl">
          <input
            type="tel"
            placeholder="Phone Number"
            autoComplete="no"
            className="bg-gray-200 text-gray-600 text-center mr-auto w-full placeholder-gray-600"
            onClick={(e) => {
              e.preventDefault();
            }}
            required
            onChange={(e) => {
              updater("number")(e.target.value);
              updateCV!("number", e.target.value);
            }}
            value={cvData.number}
          ></input>
        </div>

        <div className="mx-5 mb-5 bg-gray-200 text-gray-600 placeholder-gray-600 text-md x-small:text-xl sm:text-3xl text-center flex flex-row placeholder [&>*]:rounded-2xl rounded-2xl">
          <TextInput
            placeholder={"Email"}
            setVariable={updater("email")}
            variable={cvData.email}
            firebaseField="email"
          />
        </div>

        <div className="mx-5 mb-5 bg-gray-200 text-gray-600 placeholder-gray-600 place-content-center text-md x-small:text-xl sm:text-3xl text-center flex flex-row [&>*]:rounded-2xl rounded-2xl">
          <TextInput
            placeholder="Personal Statement"
            setVariable={updater("personalStatement")}
            variable={cvData.personalStatement}
            long={true}
            firebaseField="personalStatement"
          />
        </div>
      </div>

      <div id="qualities">
        <GenericSection
          name="Soft Skills"
          setSelected={updater("qualities")}
          selected={cvData.qualities}
          description="Soft skills, also known as power skills, common skills or core skills, are skills applicable to all professions."
          examples={["Teamwork", "Communication"]}
          firebaseField="qualities"
        />
      </div>

      <div id="skills">
        <GenericSection
          name="Hard Skills"
          apiURL="https://europe-west2-bobbleapp.cloudfunctions.net/getSkills"
          setSelected={updater("skills")}
          selected={cvData.skills}
          description="Hard skills are specific abilities, or capabilities, that an individual can possess and demonstrate in a measured way."
          examples={["Python Programming", "Bookkeeping"]}
          firebaseField="skills"
        />
      </div>

      <div id="education">
        <EducationSection
          name="Education"
          setEducation={updater("education")}
          education={cvData.education}
        />
      </div>

      <div id="experience">
        <ExperienceSection
          name="Experience"
          setExperience={updater("experience")}
          experience={cvData.experience}
        />
      </div>

      <ReferenceSection refs={cvData.refs} setRefs={updater("refs")} />

      <div
        id="cvstyle"
        className={"bg-white ml-10 mr-10 rounded-3xl p-5  mt-10"}
      >
        <div className="flex flex-row  justify-center ">
          <h1 className="text-xl min-[750px]:text-3xl font-semibold text-center mb-3">
            Choose your CV Style
          </h1>
        </div>

        <div className="flex flex-row flex-wrap sm-md:flex-nowrap justify-evenly gap-8 ">
          {["Professional CV", "Formal CV", "Modern CV"].map((each, i) => {
            return (
              <div
                key={i}
                className="flex flex-col justify-center  justify-items-center text-center"
              >
                <div
                  onClick={(_) => {
                    setLayoutOption(i + 1);
                  }}
                  className={
                    " bg-gray-200 rounded-full w-20 h-20 justify-center mx-auto " +
                    (i == layoutOption - 1
                      ? "border-2 border-gray-600"
                      : "border-0") +
                    (buttonStyles[i] ? " " + buttonStyles[i] : "")
                  }
                ></div>
                <h1>{each}</h1>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <PDFDownloadLink
          document={cvInstances[layoutOption - 1]}
          fileName={cvData.fname + cvData.sname + "CV"}
        >
          <button
            type="submit"
            className="rounded-full border-2 border-black flex justify-center mr-auto ml-auto m-10 w-44 h-20 text-black text-2xl"
          >
            <h1 className="my-auto">Create CV</h1>
          </button>
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default CVBuilder;
