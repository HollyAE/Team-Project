import { useUpdateCVDoc } from "hooks";
import type { Dispatch, FC, SetStateAction } from "react";

//section that encapsulates taking down a users references.

interface props {
  refs: reference[];
  setRefs: Dispatch<SetStateAction<reference[]>>;
}

let ReferenceSection: FC<props> = ({ refs, setRefs }) => {
  let updateCV = useUpdateCVDoc();

  return (
    <div
      id="references"
      className={
        "bg-white ml-10 mr-10 rounded-3xl p-5 h-[" +
        (20 * refs.length +
          5 +
          (refs.length == 1 ? 20 : 0) +
          (refs.length == 0 ? 35 : 0)) +
        "vw]"
      }
    >
      <div className="flex flex-row  justify-between  text-xl min-[750px]:text-3xl ">
        <h1 className="font-semibold sm-md:p-0 text-center sm-md:text-left">
          References
        </h1>
        <div className="flex flex-row gap-4 ">
          <button
            className=""
            onClick={() => {
              updateCV!("refs", [
                ...refs,
                {
                  refereeName: "",
                  refereeContact: "",
                  reference: "",
                } as reference,
              ]);
              setRefs([
                ...refs,
                {
                  refereeName: "",
                  refereeContact: "",
                  reference: "",
                } as reference,
              ]);
            }}
          >
            +
          </button>
          <button
            className=""
            onClick={() => {
              updateCV!(
                "refs",
                refs.filter((_, i) => i != refs.length - 1)
              );
              setRefs(refs.filter((_, i) => i != refs.length - 1));
            }}
          >
            -
          </button>
        </div>
      </div>

      {refs.length == 0 ? <div className="h-20"></div> : ""}
      {refs.map((each, i) => {
        return (
          <div
            className="flex flex-row flex-wrap justify-center mt-4 "
            key={i}
            id={i + ""}
          >
            <div className="w-full sm-md:w-1/3">
              <div className="flex-col">
                <input
                  type="text"
                  className="w-full h-8 sm-md:h-24 bg-gray-200 text-gray-600 text-center sm-md:border-r-2 border-b-2 border-gray-400 rounded-t-xl sm-md:rounded-tr-none"
                  placeholder="Name of Referee"
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "Referee Name")}
                  onChange={(e) => {
                    var newArr = [...refs];
                    newArr[i].refereeName = e.target.value;
                    setRefs(newArr);
                    updateCV!("refs", refs);
                  }}
                  value={refs[i].refereeName}
                />
                <input
                  type="text"
                  className="w-full h-12 sm-md:h-24 bg-gray-200 text-gray-600 text-center sm-md:border-r-2 border-gray-400 border-b-2 sm-md:border-b-0 sm-md:rounded-bl-xl "
                  placeholder="Contact Details"
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "Contact Details")}
                  onChange={(e) => {
                    var newArr = [...refs];
                    newArr[i].refereeContact = e.target.value;
                    setRefs(newArr);
                    updateCV!("refs", refs);
                  }}
                  value={refs[i].refereeContact}
                />
              </div>
            </div>
            <div className="w-full sm-md:w-2/3">
              <textarea
                placeholder={"Reference " + (i + 1)}
                className="w-full h-24 sm-md:h-48 bg-gray-200 text-gray-600 text-center rounded-b-xl sm-md:rounded-r-xl sm-md:rounded-bl-none"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Reference " + (i + 1))}
                onChange={(e) => {
                  var newArr = [...refs];
                  newArr[i].reference = e.target.value;
                  setRefs(newArr);
                  updateCV!("refs", refs);
                }}
                value={refs[i].reference}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReferenceSection;
