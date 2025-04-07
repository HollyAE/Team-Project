import { Dispatch, FC, SetStateAction } from "react";

import { useUpdateCVDoc } from "hooks";

//This component is only used for Education and Experience
//Variable and setVariable is the variable to be set for the selected input (e.g. Education, Experience)
//Types are the types for the type selector field (e.g. Only used in Education for Primary School, University etc.)
//Description is now redundant
//Index is the index of the variable to be changed (e.g. variable[index] is logically the same as education[0] under the right conditions)
//Selected is used for a string skeleton of name for each object in the variable array
//Selname is selected[index]
//firebaseField is the name of the firebase field to update (optional)

//The props make more sense after looking at education and experience sections, which are extremely similar to each other
interface props {
  setVariable: Dispatch<SetStateAction<any[]>>;
  variable: any[];
  selected: any[];
  types?: string[];
  index: number;
  setSelected: Dispatch<SetStateAction<any[]>>;
  selname: string;
  firebaseField?: string;
}

let SelectedInput: FC<props> = ({
  setVariable,
  variable,
  types,
  index,
  selected,
  setSelected,
  selname,
  firebaseField,
}) => {
  const updateCVField = useUpdateCVDoc();

  //Props dictate how the component looks, and how it's updated.
  return (
    <div className="flex flex-col  border-solid border-2 rounded-xl text-gray-600 bg-gray-200 ">
      <div className="flex flex-row justify-end">
        <button
          className="font-bold text-right mx-2"
          onClick={() => {
            setSelected(selected.filter((a) => a !== selname));
            if (firebaseField)
              updateCVField(
                firebaseField,
                variable.filter((a) => a.name !== selname)
              );
            setVariable(variable.filter((a) => a.name !== selname));
          }}
        >
          x
        </button>
      </div>

      <div className="flex flex-col sm-md:flex-row sm-md:flex-wrap sm-md:justify-evenly  sm-md:justify-items-center w-auto h-auto">
        {!types ? (
          <div className="flex flex-col sm-md:flex-row gap-2 sm-md:gap-8 sm-md:px-2 sm-md:justify-center sm-md:my-auto pb-3 ">
            <h1 className="p-2 text-center border-b-2 border-gray-300 ">
              {selname}
            </h1>

            <input
              type="text"
              placeholder="Job Title"
              className="p-2 bg-gray-200 text-gray-600 placeholder-gray-600 w-full sm-md:w-auto text-center  border-gray-300 border-b-2 "
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Job Title")}
              onChange={(e) => {
                setVariable(
                  variable.map((each, i) => {
                    if (i == index) {
                      each.jobTitle = e.target.value;
                    }

                    return each;
                  })
                );
                if (firebaseField) updateCVField(firebaseField, variable);
              }}
              value={variable[index]?.jobTitle}
            />
          </div>
        ) : (
          <div className="flex flex-col sm-md:flex-row gap-2 sm-md:gap-8 sm-md:px-2 sm-md:justify-center sm-md:my-auto pb-3 ">
            <h1 className="p-2 text-center border-b-2 border-gray-300 ">
              {selname}
            </h1>
            {["University", "College", "Other"].includes(
              variable[index]?.type
            ) ? (
              <input
                type="text"
                placeholder="Grade / Certification"
                className="p-2 bg-gray-200 text-gray-600 placeholder-gray-600 w-auto text-center  border-gray-300 border-b-2 "
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Grade / Certification")}
                onChange={(e) => {
                  setVariable(
                    variable.map((each, i) => {
                      if (i == index) {
                        each.degreeClassification = e.target.value;
                      }

                      return each;
                    })
                  );
                  if (firebaseField) updateCVField(firebaseField, variable);
                }}
                value={variable[index]?.degreeClassification}
              />
            ) : (
              ""
            )}
          </div>
        )}
        {types ? (
          <select
            name="typeselector"
            className="mx-auto my-3 w-1/2 sm-md:w-auto flex flex-col sm-md:flex-row sm-md:flex-wrap text-gray-600 bg-gray-200 border-2 border-gray-300 "
            placeholder="Type of Education"
            onChange={(e) => {
              setVariable(
                variable.map((each, i) => {
                  if (i == index) {
                    each.type = e.target.value;
                  }

                  return each;
                })
              );
              if (firebaseField) updateCVField(firebaseField, variable);
            }}
          >
            <option selected disabled>
              Type of Education
            </option>
            {types.map((each, i) => {
              if (variable[index]?.type == each) {
                return (
                  <option key={i} value={each} selected>
                    {each}
                  </option>
                );
              } else
                return (
                  <option key={i} value={each}>
                    {each}
                  </option>
                );
            })}
          </select>
        ) : (
          ""
        )}
        <div className="flex flex-row flex-wrap min-[600px]:flex-nowrap justify-evenly  bg-gray-200">
          <div className="flex flex-col sm-md:flex-row">
            <input
              id={"start" + index}
              type="month"
              className="p-2 text-gray-600 text-center bg-gray-200  sm-md:border-r-2  border-gray-300"
              onChange={(event) => {
                setVariable(
                  variable.map((each, i) => {
                    if (i === index && event.target.value[0] !== "0") {
                      each.startDate = event.target.value;
                    }

                    return each;
                  })
                );
                if (firebaseField) updateCVField(firebaseField, variable);
              }}
              value={variable[index]?.startDate}
            />
            <h1 className="invisible sm-md:visible w-0 sm-md:w-auto h-0 sm-md:h-auto flex flex-row justify-center text-3xl sm-md:mx-5 sm-md:my-3 text-gray-600">
              -
            </h1>
            <input
              id={"end" + index}
              type="month"
              className="p-2 text-gray-600 text-center bg-gray-200 border-l-0 sm-md:border-l-2 border-gray-300"
              onChange={(event) => {
                setVariable(
                  variable.map((each, i) => {
                    if (i === index) {
                      each.endDate = event.target.value;
                    }

                    return each;
                  })
                );
                if (firebaseField) updateCVField(firebaseField, variable);
              }}
              value={variable[index]?.endDate}
            />
          </div>
        </div>
      </div>
      <div>
        <textarea
          placeholder="Description"
          className="bg-gray-200 text-gray-600 placeholder-gray-600 text-xl text-center h-40 w-full border-t-2 border-gray-300"
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Description")}
          onClick={(e) => {
            e.preventDefault();
          }}
          onChange={(e) => {
            setVariable(
              variable.map((each, i) => {
                if (i == index) {
                  each.description = e.target.value;
                }

                return each;
              })
            );
            if (firebaseField) updateCVField(firebaseField, variable);
          }}
          value={variable[index]?.description}
        />
      </div>
    </div>
  );
};

export default SelectedInput;
