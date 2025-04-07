import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useUpdateCVDoc } from "hooks";
import SearchBar from "@c./SearchBar";

//TODO

//Extremely similar to ExperienceSection.tsx and EducationSection.tsx, but used for soft and hard skills

//Name is used for title displayed at top of component
//apiURL is optional (used for hard skills API)
//examples are used so users can click on examples for each skill type (soft + hard)
interface props {
  name: string;
  apiURL?: string;
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  description?: string;
  examples?: string[];
  firebaseField?: string;
}

let GenericSection: FC<props> = ({
  name,
  apiURL,
  selected,
  setSelected,
  description,
  examples,
  firebaseField,
}) => {
  let [search, setSearch] = useState("");

  //Used for api stuff, holds all the skill options from API
  let [skills, setSkills] = useState<skill[]>([]);

  const [backup, setBackup] = useState<skill[]>([]);
  const ref = useRef(null);

  //Used to add a skill, also adds on Firebase
  function add(name: string) {
    const oldsel = [...selected, name];
    setSelected([...selected, name]);
    if (firebaseField) updateCV(firebaseField, oldsel);
    setSkills(skills.filter((a) => a.name != name));
  }

  //Loads skills into component if apiURL
  let loadSkills = useCallback(async () => {
    if (apiURL) {
      const res = await fetch(apiURL);
      const data = await res.json();
      setBackup(data);
    }
  }, [apiURL]);

  //When backup is changed, loadSkills occurs
  useEffect(() => {
    loadSkills();
  }, [setBackup, loadSkills]);

  //Used to reset the skills array to the backup
  function resetSkills() {
    setSkills(backup);
  }

  let updateCV = useUpdateCVDoc();

  //On change, logic for what should happen when text entered in the searchbar occurs, filtering API stuff
  function changeFunction(e: any) {
    const oldSearch = search;
    setSearch(e.target.value);
    if (e.target.value.length < 3) {
      setSkills([]);
    } else if (e.target.value.length == 3) {
      setSkills(
        backup.filter((u: any) =>
          u.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setSkills(
        skills.filter((u: any) =>
          u.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  }

  //Onkeyup, used for search bar and to filter API
  function onKeyUpFunction(ev: any) {
    if (ev.key === "Enter") {
      add(search);
      setSearch("");
      setSkills([]);
    } else if (ev.key === "Backspace" && search.length > 2) {
      setSkills(
        backup.filter((e: any) =>
          e.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (ev.key === "Backspace") {
      setSkills([]);
    }
  }

  return (
    <div className=" bg-white rounded-3xl m-10 p-5 min-h-full">
      <div className="flex flex-row flex-wrap sm-md:flex-nowrap justify-center ">
        <h1 className=" text-xl min-[750px]:text-3xl font-semibold mx-2 pb-3 sm-md:p-0 sm-md:w-1/4 w-full text-center sm-md:text-left">
          Pick Some {name}:
        </h1>
        {apiURL ? (
          <SearchBar
            ref={ref}
            search={search}
            onChange={changeFunction}
            onKeyUp={onKeyUpFunction}
          />
        ) : (
          <SearchBar
            ref={ref}
            search={search}
            onChange={changeFunction}
            onKeyUp={onKeyUpFunction}
            noIcon={true}
          />
        )}
      </div>

      <div
        className={
          "pt-2 flex flex-row flex-wrap [&>*]:mr-2 justify-evenly" +
          (apiURL && skills.length != 0
            ? " h-auto border-b border-dashed border-gray-600"
            : "")
        }
        id="searchresults"
      >
        {skills.slice(0, 6).map((e, i) => (
          <div
            className="flex flex-row flex-wrap justify-items-center mt-2 mb-4 "
            key={i}
          >
            <button
              className="flex flex-row flex-wrap p-2 font-bold  w-full text-gray-600 bg-gray-200 rounded-full "
              onClick={() => {
                add(e.name);
                setSearch("");
                setSkills([]);
              }}
            >
              <h1 className="text-xs ml-auto mr-auto p-2">{e.name}</h1>
            </button>
          </div>
        ))}
      </div>

      {selected.length == 0 && search == "" ? (
        <div className="">
          {description ? (
            <div
              className={
                "text-md min-[750px]:text-xl flex flex-row flex-1 gap-3 flex-wrap place-content-center " +
                (!apiURL ? "mt-2" : "")
              }
            >
              <h1 className={"  text-left max-[605px]:text-center "}>
                {description + (examples ? " For Example: " : "")}
              </h1>

              <div className=" flex flex-row flex-wrap  justify-center gap-3 ">
                {examples
                  ? examples.map((each, i) => {
                      return (
                        <div className="" key={i}>
                          <button
                            className="mx-2 bg-gray-200 text-gray-600 p-2 rounded-xl"
                            onClick={() => {
                              add(each);
                              setSearch("");
                              setSkills([]);
                            }}
                          >
                            {each}
                          </button>
                          {i < examples.length - 1}
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : !apiURL ? (
        <div />
      ) : (
        ""
      )}

      <div className="flex flex-row flex-wrap mt-10">
        {selected.map((e, i) => (
          <div
            key={i}
            className="flex flex-row border-solid border-2 justify-items-center rounded-full mr-3 mt-3 text-center bg-gray-200 text-gray-600"
          >
            <h1 className="ml-auto mr-auto p-2 ">{e}</h1>
            <button
              className="p-2 font-bold"
              onClick={() => {
                setSelected(selected.filter((a) => a !== e));
                if (firebaseField)
                  updateCV(
                    firebaseField,
                    selected.filter((a) => a !== e)
                  );
                resetSkills();
                setSkills(skills.filter((u: any) => !selected.includes(u)));
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenericSection;
