import { FC } from "react";
import ChevronLeft from "icons/ChevronLeft";
import ChevronRight from "icons/ChevronRight";

import Listing from "@c./jobs/JobListing";

//TODO
//Introduce Progress Bar in Controls/Slider

interface content {
  job_info: job[];
  section_title: string;
  limit?: number;
  scrollable?: boolean;
  category?: string;
  applyFunction?: (job_post_uid: string) => void;
}

let JobCollection: FC<content> = ({
  job_info,
  section_title,
  limit,
  scrollable = true,
  category,
  applyFunction,
}) => {
  if (limit) {
    job_info = job_info.slice(0, limit);
  }

  if (category) {
    job_info = job_info.filter((each) => {
      return each.category?.includes(category as JobCategory);
    });
  }

  //!this is evil but i do not know how to fix it.
  const slideRight = () => {
    var slider = document.getElementById("slider" + section_title);
    if (slider) {
      slider.scrollLeft += 200;
    }
  };

  const slideLeft = () => {
    var slider = document.getElementById("slider" + section_title);
    if (slider) {
      slider.scrollLeft -= 200;
    }
  };

  return (
    <div
      className="ml-5 my-10 flex flex-col flex-shrink"
      style={{ userSelect: "none" }}
    >
      <div className="flex flex-row flex-none justify-between mr-5 text-2xl sm:text-3xl h-1/3 sm:h-auto">
        <h1 className="font-bold ">{section_title}</h1>
        <div className="">
          {scrollable ? (
            <div className=" flex flex-row [&>*]:mx-5 bg-white py-3 rounded-full">
              <div className="" onClick={slideLeft}>
                <ChevronLeft height={6} />
              </div>
              <div onClick={slideRight}>
                <ChevronRight height={6} />
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div
        className={
          scrollable
            ? "overflow-x-scroll no-scrollbar scroll-smooth overflow-y-hidden "
            : ""
        }
        id={"slider" + section_title}
      >
        <div
          className={
            scrollable ? "w-[115vw] flex flex-row mt-5" : "flex flex-row mt-5"
          }
        >
          {job_info.map((each, i) => {
            return (
              <div
                className="flex flex-row flex-none transition-all my-2 overflow-y-hidden"
                key={i}
              >
                <Listing info={each} applyFunction={applyFunction} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobCollection;
