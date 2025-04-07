import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import data from "data/univierities.json";
import SearchBar from "@c./SearchBar";
import SelectedInput from "@cv/SelectedInput";

//Component encapsulates everything to do with taking down a user's education for the CV
//Functionally the same as ExperienceSection.tsx

//Name is the title displayed at the top of the section
interface props {
  name: string;
  education: education[];
  setEducation: Dispatch<SetStateAction<education[]>>;
}

let EducationSection: FC<props> = ({ name, education, setEducation }) => {
  //Selected used for mapping purposes
  const [selected, setSelected] = useState<string[]>([]);

  //Search variable used for searchbar
  let [search, setSearch] = useState("");

  //Used for API/JSON stuff
  const [universities, setUniversities] = useState<university[]>([]);

  //Backup so that only one call to JSON needs to be made
  const backup = data;

  //Add an item to the education array
  function add(name: string) {
    setSelected([...selected, name]);
    const newEducation: education = {
      name: name,
      startDate: null,
      endDate: null,
      type: "",
      description: "",
      degreeClassification: "",
    };
    setEducation([...education, newEducation]);
  }

  //Used for logic of when a user presses enter, or what to do when backspace is pressed
  function onKeyUp(ev: any) {
    if (ev.key === "Enter") {
      add(search);
      setSearch("");
      setUniversities([]);
    } else if (ev.key === "Backspace" && search.length > 2) {
      setUniversities(
        backup.filter((e) =>
          e.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (ev.key === "Backspace") {
      setUniversities([]);
    }
  }

  //When changing, the search variable is set (to update searchbar), and the universities are filtered
  function onChange(e: any) {
    const oldSearch = search;
    setSearch(e.target.value);
    if (e.target.value.length < 3) {
      setUniversities([]);
    } else if (e.target.value.length == 3) {
      setUniversities(backup);
    } else {
      setUniversities(
        universities.filter((u: any) =>
          u.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  }

  //Used to populate selected with the education names on first component load
  useEffect(() => {
    setSelected(
      education.map((each) => {
        return each.name;
      })
    );
  }, [education]);

  return (
    <div className="bg-white rounded-3xl m-10 p-5 min-h-full">
      <div className="flex flex-row flex-wrap sm-md:flex-nowrap justify-center align-middle ">
        <h1 className="text-xl min-[750px]:text-3xl font-semibold mx-2 pb-3 sm-md:p-0 sm-md:w-1/4 w-full text-center sm-md:text-left">
          Whats Your {name}?
        </h1>
        <SearchBar
          search={search}
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder={"e.g. University of Glasgow"}
        />
      </div>

      <div
        className={
          "pt-2 flex flex-row flex-wrap [&>*]:mr-2 justify-evenly" +
          (universities.length != 0
            ? " h-auto border-b border-dashed border-gray-600"
            : "")
        }
        id="searchresults"
      >
        {universities.slice(0, 6).map((e, i) => (
          <div
            className="flex flex-row flex-wrap justify-items-center mt-2 mb-4"
            key={i}
          >
            <button
              className="flex flex-row flex-wrap p-2 font-bold  w-full text-gray-600 bg-gray-200 rounded-full"
              onClick={() => {
                add(e.name);
                setSearch("");
                setUniversities([]);
              }}
            >
              <h1 className="text-xs ml-auto mr-auto p-2">{e.name}</h1>
            </button>
          </div>
        ))}
      </div>

      {education.length == 0 ? <div className="h-20"></div> : ""}

      <div className="flex flex-col gap-6 pt-2">
        {education.map((e, i) => (
          <SelectedInput
            key={i}
            setVariable={setEducation}
            variable={education}
            selected={selected}
            types={[
              "Primary School",
              "High School",
              "College",
              "University",
              "Other",
            ]}
            index={i}
            setSelected={setSelected}
            selname={e.name}
            firebaseField="education"
          />
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
