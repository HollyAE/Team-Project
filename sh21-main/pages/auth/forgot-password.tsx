import { NextPage } from "next";
import { useContext, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

import FirebaseContext from "context/firebaseContext";

let ForgotPassword: NextPage = () => {
  const { auth } = useContext(FirebaseContext);

  let [email, setEmail] = useState("");

  const [sendPasswordResetEmail, loading, error] = useSendPasswordResetEmail(
    auth!
  ); //!this is not safe

  return (
    <div className="m-auto mt-20 h-1/2 w-1/3 items-center rounded-2xl bg-white p-10">
      <div className="ml-auto mr-auto w-fit">
        <br />
        {error && <h3 className="text-red-600">{error.message}</h3>}
        {loading && <h3 className="text-blue-600">Loading....</h3>}
        <h1 className="mr-36 text-center text-5xl font-extrabold">
          Reset Password
        </h1>
        <form
          onSubmit={(e) => {
            if (email) {
              sendPasswordResetEmail(email);
            }

            e.preventDefault();
          }}
          className="mt-10"
        >
          <h2 className="mt-10 font-bold">Email:</h2>
          <input
            className="w-full rounded-full border-2"
            type="text"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="submit"
            value="Send Reset Password Email"
            className="mr-auto ml-auto mt-5 flex h-20 w-96 justify-center rounded-full border-2 bg-gradient-to-t from-pink-400 to-blue-600 p-2 text-2xl"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
