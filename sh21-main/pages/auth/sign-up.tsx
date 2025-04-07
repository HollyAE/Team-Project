import { NextPage } from "next";
import { useState } from "react";

import { DetailsForm, SignupForm } from "@c./auth";

let SignUp: NextPage = () => {
  let [newUser, setNewUser] = useState<user>({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
  });

  let [stageFlag, setStageFlag] = useState(true);

  return (
    <div className="bg-white rounded-2xl mt-20 m-auto h-1/2 w-1/3">
      <div className="w-fit ml-auto mr-auto p-10">
        <br />
        {stageFlag ? (
          <DetailsForm
            setStageFlag={setStageFlag}
            newUser={newUser}
            setNewUser={setNewUser}
          />
        ) : (
          <SignupForm
            setStageFlag={setStageFlag}
            newUser={newUser}
            setNewUser={setNewUser}
          />
        )}
      </div>
    </div>
  );
};

export default SignUp;
