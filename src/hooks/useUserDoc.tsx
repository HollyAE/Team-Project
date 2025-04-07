import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/firebaseContext";

function useUserDoc() {
  let { db, user } = useContext(FirebaseContext);
  const [userDoc, setUserDoc] = useState<user>();

  async function getUserDoc() {
    if (db && user?.email) {
      const data = await getDoc(doc(db, "users", user?.email));
      setUserDoc(data.data() as user);
      console.log("Got User!");
    }
  }

  useEffect(() => {
    getUserDoc();
  }, []);

  return userDoc;
}

export default useUserDoc;
