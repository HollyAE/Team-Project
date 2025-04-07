import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Dispatch, FC, SetStateAction } from "react";
import { ItemInterface, ReactSortable } from "react-sortablejs";

// Long CV is now referred to as Professional CV on the buttons
// Colourful CV is now referred to as Modern CV on the buttons

//Drilled down props for each field of the CV & the given layout option & order of cv elements (see build-cv.tsx for more info)
interface props {
  UserCVs: JSX.Element[];
  fname: string;
  sname: string;
  layoutOption: number;
  setLayoutOption: Dispatch<SetStateAction<number>>;
  order2: ItemInterface[];
  setOrder2: Dispatch<SetStateAction<ItemInterface[]>>;
  order13: ItemInterface[];
  setOrder13: Dispatch<SetStateAction<ItemInterface[]>>;
}

let CVViewer: FC<props> = ({
  UserCVs,
  fname,
  sname,
  layoutOption,
  setLayoutOption,
  order2,
  setOrder2,
  order13,
  setOrder13,
}) => {
  //Styles for each CV Style Button
  const buttonstyles = [
    "bg-gray-200",
    "bg-green-400",
    "bg-gradient-to-t from-bg-red-200 to-bg-green-300",
  ];

  //Code very similar to CVBuilder.tsx, but with the viewer instead of the components.
  //ReactSortable.js is used to reorder the sections of the CV
  //A different sortable component is used depending on which CV Style is selected
  return (
    <div className="mt-10 justify-center w-full [&>*]:justify-center place-self-center ">
      <div className="flex flex-col medium:flex-row order-1 gap-4 p-6">
        <div
          id="cvstyle"
          className={
            " flex flex-col gap-4  rounded-3xl py-2 h-auto  medium:w-1/5"
          }
        >
          <div className="flex flex-col text-5xl">
            <h1 className="text-3xl text-center mx-5">Choose your CV Style</h1>
          </div>

          <div className="flex medium:flex-col justify-evenly w-full  justify-items-center flex-wrap medium:flex-nowrap text-center gap-6">
            {["Professional CV", "Formal CV", "Modern CV"].map((each, i) => {
              return (
                <div
                  key={i}
                  className="justify-center flex flex-col w-auto h-auto justify-items-center text-center align-middle text-3xl mx-6"
                >
                  <div
                    onClick={(e) => {
                      setLayoutOption(i + 1);
                    }}
                    className={
                      "rounded-full w-20 h-20 justify-center mx-auto " +
                      (i == layoutOption - 1
                        ? "border-2 border-gray-600"
                        : "border-0") +
                      (buttonstyles[i] ? " " + buttonstyles[i] : "")
                    }
                  ></div>
                  <h1 className="text-2xl">{each}</h1>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full medium:w-3/5 mx-auto flex flex-row justify-center medium:order-2 order-3">
          <PDFViewer
            className="h-screen medium:h-auto justify-center block w-full"
            showToolbar={false}
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            {UserCVs[layoutOption - 1]}
          </PDFViewer>
        </div>

        <div
          id="cvstyle"
          className={
            "flex flex-col gap-2 rounded-3xl py-2  h-auto  medium:w-1/5 order-2 medium:order-3"
          }
        >
          <div className="flex flex-col text-5xl">
            <h1 className="text-3xl text-center mx-5">Choose your CV Order</h1>
          </div>
          {layoutOption == 2 ? (
            <ReactSortable
              animation={200}
              delay={0}
              list={order2}
              setList={setOrder2}
              className="flex medium:flex-col flex-wrap medium:flex-nowrap justify-center text-center medium:gap-6"
            >
              {order2.map((each, i) => {
                return (
                  <div
                    key={i}
                    className="justify-center flex flex-wrap  justify-items-center text-center align-middle text-3xl list-group-item p-5 medium:p-8 border-2 m-2 rounded-3xl"
                  >
                    <h1 className="text-2xl">{each.name}</h1>
                  </div>
                );
              })}
            </ReactSortable>
          ) : (
            <ReactSortable
              animation={200}
              delay={0}
              list={order13}
              setList={setOrder13}
              className="flex medium:flex-col flex-wrap medium:flex-nowrap justify-center text-center medium:gap-6"
            >
              {order13.map((each, i) => {
                return (
                  <div
                    key={i}
                    className="justify-center flex flex-wrap  justify-items-center text-center align-middle text-3xl list-group-item p-5 medium:p-8 border-2 m-2 rounded-3xl"
                  >
                    <h1 className="text-2xl">{each.name}</h1>
                  </div>
                );
              })}
            </ReactSortable>
          )}
        </div>
      </div>

      <div>
        <PDFDownloadLink
          document={UserCVs[layoutOption - 1]}
          fileName={fname + sname + "CV"}
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

export default CVViewer;
