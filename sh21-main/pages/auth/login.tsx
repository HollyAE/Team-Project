import { NextPage } from "next";
import Link from "next/link";
import { useContext, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import FirebaseContext from "context/firebaseContext";

let Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useContext(FirebaseContext);

  //note this assertion is not safe, but no time to fix
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth!);

  return (
    <div className="bg-white rounded-2xl mt-20 m-auto h-4/6 w-1/3 items-center [&>]:m-auto">
      <div className="w-fit ml-auto mr-auto">
        <br />
        {error && <h3 className="text-red-600">{error.message}</h3>}
        {loading && <h3 className="text-blue-600">Loading....</h3>}
        <form
          onSubmit={(e) => {
            signInWithEmailAndPassword(email, password).then(() => {
              window.location.assign("/");
            });

            e.preventDefault();
          }}
          className="mt-10"
        >
          <h2 className="font-bold mt-10">Email</h2>
          <input
            className="border-2 rounded-full flex justify-center"
            type="text"
            id="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <h2 className="font-bold">Password</h2>
          <input
            className="border-2 rounded-full"
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input
            type="submit"
            value="Login"
            className="border-2 rounded-full p-2 to-blue-600 from-pink-400 bg-gradient-to-t flex justify-center mr-auto ml-auto mt-5 w-44 h-20"
          ></input>
        </form>
      </div>
      <div className="p-10 ml-auto mr-auto w-fit">
        <Link
          href="/auth/sign-up"
          className="border-2 rounded-full p-2 w-44 to-blue-600 from-pink-400 bg-gradient-to-t flex justify-center"
        >
          Sign Up
        </Link>
        <Link
          href="/auth/forgot-password"
          className="border-2 rounded-full p-2 w-44 to-blue-600 from-pink-400 bg-gradient-to-t flex justify-center"
        >
          Forgot Password
        </Link>
      </div>
    </div>
  );
};

export default Login;
