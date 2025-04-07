import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import SearchBar from "@c./SearchBar";
import SelectedInput from "@cv/SelectedInput";

//Component encapsulates everything to do with taking down a user's experience for the CV
//Functionally the same as EducationSection.tsx

//Name is the title displayed at the top of the section
interface props {
  name: string;
  experience: experience[];
  setExperience: Dispatch<SetStateAction<experience[]>>;
}

let ExperienceSection: FC<props> = ({ name, experience, setExperience }) => {
  //Selected used for mapping purposes
  let [selected, setSelected] = useState<string[]>([]);

  //Search variable used for searchbar
  let [search, setSearch] = useState("");

  //Add an item to the experience array
  function add(name: string) {
    setSelected([...selected, name]);
    const newExoerience: experience = {
      name: name,
      startDate: null,
      endDate: null,
      description: null,
      jobTitle: "",
    };
    setExperience([...experience, newExoerience]);
  }

  //Used for logic of when a user presses enter
  function onKeyUp(ev: any) {
    if (ev.key === "Enter") {
      add(search);
      setSearch("");
    }
  }

  //On change, set the set variable
  function onChange(e: any) {
    const oldSearch = search;
    setSearch(e.target.value);
  }

  //Used to populate selected with the experience names on first component load
  useEffect(() => {
    setSelected(
      experience.map((each) => {
        return each.name;
      })
    );
  }, [experience]);

  return (
    <div className="bg-white rounded-3xl m-10 p-5 min-h-full]">
      <div className="flex flex-row flex-wrap sm-md:flex-nowrap justify-center align-middle ">
        <h1 className="text-xl min-[750px]:text-3xl font-semibold mx-2 pb-3 sm-md:p-0 sm-md:w-1/4 w-full text-center sm-md:text-left">
          Whats Your {name}?
        </h1>
        <SearchBar
          search={search}
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder={"e.g. Bobbll Ltd."}
          noIcon={true}
        />
      </div>

      {selected.length == 0 ? <div className="h-20"></div> : ""}
      <div className="flex flex-col pt-4 gap-6">
        {experience.map((e, i) => (
          <SelectedInput
            key={i}
            setVariable={setExperience}
            variable={experience}
            selected={selected}
            index={i}
            setSelected={setSelected}
            selname={e.name}
            firebaseField="experience"
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
