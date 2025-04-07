import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/firebaseContext";

function useCVDoc() {
  let { db, user } = useContext(FirebaseContext);
  const [cvDoc, setCVDoc] = useState<CV>();

  async function getCV() {
    if (db && user?.email) {
      const data = await getDoc(doc(db, "cvs", user?.email));
      setCVDoc(data.data() as CV);
      console.log("Got CV!");
    }
  }

  useEffect(() => {
    getCV();
  }, []);

  return cvDoc;
}

export default useCVDoc;
