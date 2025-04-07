import { NextPage } from "next";
import dynamic from "next/dynamic";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ItemInterface } from "react-sortablejs";

import { ColourfulCV, FormalCV, LongCV } from "@cv/templates";
import { useCVDoc } from "hooks";

//This is set as the PDF is rendered locally on the machine. This prevents a hydration error.
const CVBuilder = dynamic(() => import("@cv/Builder"), {
  ssr: false,
});

const CVViewer = dynamic(() => import("@cv/Viewer"), {
  ssr: false,
});

let CV: NextPage = () => {
  //Use the useCVDoc hook to get the User Document from the firebase
  const cvDoc = useCVDoc();

  //Toggle between the builder and viewer tab
  const [edit, setEdit] = useState(true);

  //State for the layout option to use
  const [layoutOption, setLayoutOption] = useState(1);

  const [cvData, setCvData] = useState<CV>({
    fname: "",
    sname: "",
    number: "",
    email: "",
    personalStatement: "",
    qualities: [],
    skills: [],
    education: [],
    experience: [],
    refs: [],
  });

  //These states are used in the CV Arrangement, as CV2 (Formal CV) and CV 1&3 (Colorful and Long) have
  //different components
  const [order2, setOrder2] = useState([
    { id: 1, name: "About Me" },
    { id: 2, name: "Education" },
    { id: 3, name: "Experience" },
  ]);

  const [order13, setOrder13] = useState([
    { id: 1, name: "About Me" },
    { id: 2, name: "Education" },
    { id: 3, name: "Experience" },
    { id: 4, name: "Skills" },
    { id: 5, name: "References" },
  ]);

  //Formal CV populated with the states and the order
  const formalcvinstance = <FormalCV CV={cvData} order={order2} />;

  //Colorful CV populated with the states and the order
  const colourfulcvinstance = <ColourfulCV CV={cvData} order={order13} />;

  //Long CV populated with the states and the order
  const longcvinstance = <LongCV CV={cvData} order={order13} />;

  //autofill the states with the CV Document's data
  useEffect(() => {
    setCvData((cvData) => {
      return {
        ...cvData,
        ...cvDoc,
      };
    });
  }, [cvDoc]);

  //Returns the page with either the viewer or builder component rendered, based on the state of edit.
  //Basic logic to toggle baked into the onClick for each button.
  //Lots of prop drilling
  return (
    <div>
      <div className="flex flex-row justify-center m-10">
        <div className="flex flex-col x-small:flex-row  items-center justify-center rounded-2xl text-3xl text-center p-5 ">
          <button
            className={
              "w-full sm:w-auto p-3 x-small:p-5 border-black border-t-2 rounded-t-2xl x-small:rounded-tr-none x-small:rounded-l-2xl x-small:border-l-2 border-x-2 x-small:border-r-0 x-small:border-y-2 transition-colors ease-in-out delay-50 " +
              (edit ? "border-white border-2 text-white" : "")
            }
            onClick={() => {
              setEdit(true);
            }}
          >
            Build
          </button>
          <button
            className={
              "w-full sm:w-auto p-3 x-small:p-5 border-2 border-black x-small:rounded-r-2xl x-small:border-l-2 border-y-2 rounded-b-2xl x-small:rounded-bl-none transition-all ease-in-out delay-50 " +
              (!edit ? "border-white text-white" : "")
            }
            onClick={() => {
              setEdit(false);
            }}
          >
            Preview
          </button>
        </div>
      </div>

      {edit ? (
        <CVBuilder
          cvData={cvData}
          setCvData={setCvData}
          cvInstances={[longcvinstance, formalcvinstance, colourfulcvinstance]}
          layoutOption={layoutOption}
          setLayoutOption={setLayoutOption}
        />
      ) : (
        <CVViewer
          UserCVs={[longcvinstance, formalcvinstance, colourfulcvinstance]}
          fname={cvData.fname}
          sname={cvData.sname}
          layoutOption={layoutOption}
          setLayoutOption={setLayoutOption}
          order2={order2}
          setOrder2={setOrder2 as Dispatch<SetStateAction<ItemInterface[]>>}
          order13={order13}
          setOrder13={setOrder13 as Dispatch<SetStateAction<ItemInterface[]>>}
        />
      )}
    </div>
  );
};

export default CV;
