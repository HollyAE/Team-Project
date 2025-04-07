import { deleteUser } from "firebase/auth";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { NextPage } from "next";
import { useContext } from "react";

import FirebaseContext from "context/firebaseContext";

let DeleteAccount: NextPage = () => {
  // todo this doesn't work, unclear why
  const { user, db, userDoc } = useContext(FirebaseContext);

  async function deleteUserDocument(deleted: user | undefined | null) {
    if (user && db) {
      const userRef = collection(db, "users");
      await deleteDoc(doc(userRef, user.email + ""));
      const cvRef = collection(db, "cvs");
      await deleteDoc(doc(cvRef, user.email + ""));
    }
  }

  if (!user) {
    return (
      <div className="rounded-3xl m-2 mx-auto p-5 text-center w-[40vw] mt-20">
        <h1 className="text-5xl font-bold">
          How did you get here? You aren&apos;t signed in at the moment.
        </h1>
      </div>
    );
  }

  return (
    <div className="rounded-3xl m-2 mx-auto p-5 text-center w-[40vw] mt-20">
      <h1 className="text-5xl font-bold">
        You are about to delete your Bobbll account. In accordance with GDPR
        Laws, we will hold you data for 60 days before deletion
      </h1>
      <h2 className="text-2xl pt-20">
        Please press the button to confirm account deletion
      </h2>

      <div
        className=" mx-auto mt-20"
        onClick={() => {
          if (user) {
            deleteUser(user);
            deleteUserDocument(userDoc).then(() => {
              window.location.assign("/");
            });
          }
        }}
      >
        <button className="text-3xl rounded-full bg-red-500 px-5 p-5 text-white">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
