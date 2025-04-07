import { doc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import FirebaseContext from "../context/firebaseContext";

function useUpdateUserDoc() {
  let { db, user } = useContext(FirebaseContext);
  if (db != null && user?.email != null) {
    const cvRef = doc(db, "users", user.email);
    return (field: string, data: any) => {
      updateDoc(cvRef, { [field]: data });
    };
  } else {
    return (field: string, data: any) => {
      console.log("Error! DB or User is null");
    };
  }
}

export default useUpdateUserDoc;
