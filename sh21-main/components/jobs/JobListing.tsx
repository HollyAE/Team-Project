import { FC } from "react";

import { useModal } from "hooks";
import JobModal from "@c./jobs/JobModal";

interface content {
  info: job;
  applyFunction?: (job_post_uid: string) => void;
}

let Listing: FC<content> = ({ info, applyFunction }) => {
  return (
    <button
      onClick={useModal(<JobModal job={info} applyFunction={applyFunction} />)}
    >
      <div id="listing" className="mr-2">
        <img
          src={info.thumbnail}
          className="h-56 min-[550px]:h-80 sm:h-96"
          alt=""
          style={{ maxWidth: "100%" }}
        />
      </div>
    </button>
  );
};

export default Listing;
