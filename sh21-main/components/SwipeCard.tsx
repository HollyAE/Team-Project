import { FC, useEffect } from "react";
import { useModal } from "hooks";
import JobModal from "@c./jobs/JobModal";
import Image from "next/image";

interface content {
  info?: job;
  apply?: () => void;
  reject?: () => void;
}

let SwipeCard: FC<content> = ({ info, apply, reject }) => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
  });

  let openModal = useModal(<JobModal job={info} />);

  return (
    <div
      className="h-[70vh] object-fill w-[80vh] pt-20"
      style={{ userSelect: "none" }}
    >
      {info ? (
        <div>
          <div className="text-center">
            <Image
              alt=""
              className="ml-auto mr-auto rounded-full h-40 w-40"
              src={info.companyImage}
              width="100"
              height="100"
              style={{ userSelect: "none" }}
            />
            <h1 className="text-5xl">{info.jobTitle}</h1>

            <h2 className="text-4xl">{info.companyName}</h2>

            <div
              id="cat1"
              className="flex flex-row mt-10 [&>*]:border [&>*]:rounded-full [&>*]:p-2 [&>*]:bg-gray-300 [&>*]:mx-auto [&>*]:w-36"
            >
              <div>{info.typeOfEmployment}</div>
              <div>
                {"£" +
                  info.amount +
                  "-" +
                  info.amountUpper +
                  " Per " +
                  info.paymentInterval}
              </div>
              <div>{info.jobLocation.addressLine.split(",")[1]}</div>
              <div>{info.jobLocationType}</div>
            </div>

            <h3 className="mt-10">{info.jobDescription}</h3>

            <button
              onClick={openModal}
              className="mt-5 text-3xl bg-black text-white p-5 rounded-full w-40"
            >
              More
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl h-full w-fit text-center ml-auto mr-auto">
          <h1 className="text-5xl mx-auto">No Jobs Left!</h1>
          <h3 className="text-3xl mx-auto mt-20">
            Come back another time to apply for more!
          </h3>
        </div>
      )}
    </div>
  );
};

export default SwipeCard;
