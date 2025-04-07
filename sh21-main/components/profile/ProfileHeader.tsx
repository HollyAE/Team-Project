import type { FC } from "react";

import Navigation from "@c./profile/Navigation";

interface props {
  active: "profile" | "skills" | "applications";
  verified: boolean;
  firstName: string;
  fnamebackup: string;
}

let Header: FC<props> = ({ verified, active, firstName, fnamebackup }) => {
  return (
    <div>
      <div className="px-10 md:m-10">
        <div className="px-1 sm:px-0 flex flex-row [&>*]:mr-20">
          <h2 className="justify-center text-2xl font-medium leading-6 text-gray-900 my-auto">
            {fnamebackup ? "Hi " + fnamebackup + "!" : ""}
          </h2>
          {verified && firstName ? (
            <h2 className="justify-center font-medium leading-6 border-2 p-2 border-white text-white rounded-full w-40 text-center">
              Verified
            </h2>
          ) : firstName ? (
            <h2 className="justify-center font-medium leading-6 border-2 p-2 border-red-600 text-red-600 rounded-full w-40 text-center">
              Unverified
            </h2>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="px-20 md:col-span-6">
        <Navigation active={active} />
      </div>
    </div>
  );
};

export default Header;
