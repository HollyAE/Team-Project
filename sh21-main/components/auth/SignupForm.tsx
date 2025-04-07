import { sendEmailVerification } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { FC, FormEventHandler, useContext, useState } from "react";

import FirebaseContext from "context/firebaseContext";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

interface props {
  setStageFlag: React.Dispatch<React.SetStateAction<boolean>>;
  newUser: user;
  setNewUser: React.Dispatch<React.SetStateAction<user>>;
}

let SignupForm: FC<props> = ({ newUser, setNewUser, setStageFlag }) => {
  let { auth, db } = useContext(FirebaseContext);

  let [create_user, user, loading, error] = useCreateUserWithEmailAndPassword(
    auth!
  );

  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  let handleSubmit: FormEventHandler = (e) => {
    if (auth && db && newUser.email && password) {
      create_user(newUser.email, password)
        .then(async (userCred) => {
          if (!userCred) return;
          if (!db) return; //this should be handled above however.
          const userRef = collection(db, "users");
          await setDoc(doc(userRef, userCred.user.email!), newUser);

          const cvRef = collection(db, "cvs");
          await setDoc(doc(cvRef, userCred.user.email!), {
            fname: newUser.firstName,
            sname: newUser.lastName,
            email: newUser.email,
          });

          return sendEmailVerification(userCred.user);
        })
        .then(() => {
          window.location.assign("/");
        });
    }

    e.preventDefault();
  };

  return (
    <>
      <h1 className="font-extrabold text-5xl mr-36 text-center">
        One last thing...
      </h1>
      <form onSubmit={handleSubmit} className="mt-10 ">
        {error && <h3 className="text-red-600">{error.message}</h3>}
        {loading && <h3 className="text-blue-600">Loading....</h3>}

        <h2 className="font-bold mt-10">Email:</h2>
        <input
          className="border-2 rounded-full w-full mb-7"
          type="text"
          id="email"
          name="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />

        <h2 className="font-bold">Password:</h2>
        <input
          className="border-2 rounded-full flex justify-center w-full mb-2"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <h2 className="font-bold">Confirm Password:</h2>
        <input
          className="border-2 rounded-full justify-center mr-auto ml-auto w-full mb-5"
          type="password"
          id="confirm"
          name="confirm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <h1
          id="helpText"
          className={`text-red-600 ${
            confirmPassword === password && "invisible"
          }`}
        >
          Passwords do not match.
        </h1>

        <input
          type="submit"
          value="Sign Up"
          className="text-2xl border-2 rounded-full p-2 to-blue-600 from-pink-400 bg-gradient-to-t flex justify-center mr-auto ml-auto mt-5 w-44 h-20"
        />
      </form>
    </>
  );
};

export default SignupForm;
