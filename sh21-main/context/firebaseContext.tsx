import { initializeApp } from "firebase/app";
import { Auth, getAuth, User } from "firebase/auth";
import {
  doc,
  Firestore,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD36ADP35szZSEM4QJXizmdwjFzwzHPcTk",
  authDomain: "sh21-bobbll.firebaseapp.com",
  projectId: "sh21-bobbll",
  storageBucket: "sh21-bobbll.appspot.com",
  messagingSenderId: "488086993536",
  appId: "1:488086993536:web:8a48c5d892e1d10e59c465",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

interface FirebaseContext {
  user: null | User;
  signOut: null | (() => Promise<boolean>);
  auth: null | Auth;
  db: null | Firestore;
  updateUserField: null | ((field: string, data: any) => Promise<void>);
  userDoc: null | user;
}

async function updateUDoc(field: string, data: any) {
  let { userDoc } = useContext(FirebaseContext);
  if (db != null && userDoc != null) {
    const userRef = doc(db, "users", userDoc.email);
    await updateDoc(userRef, { [field]: data });
  }
}

let FirebaseContext = createContext<FirebaseContext>({
  user: null,
  signOut: null,
  auth: null,
  db: null,
  updateUserField: updateUDoc,
  userDoc: null,
});

async function getUserDoc(
  email: string | null | undefined,
  setUserDoc: Dispatch<SetStateAction<user | null | undefined>>
) {
  if (email) {
    const profile = await getDoc(doc(db, "users", email));
    setUserDoc(profile.data() as user);
  }
}

export let FirebaseProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // TODO setup something with loading maybe?
  let [userDoc, setUserDoc] = useState<user | null>();
  let [user, _l, userError] = useAuthState(auth, {
    onUserChanged: async () => {
      getUserDoc(user?.email, setUserDoc);
    },
  });

  let [signOut, _o, signOutError] = useSignOut(auth);

  let anyError = userError || signOutError;

  return (
    <>
      {anyError && <p className="bg-red-600 absolute w-full">error!</p>}
      <FirebaseContext.Provider
        value={{
          user: user || null,
          signOut: signOut || null,
          auth: auth,
          db: db,
          updateUserField: updateUDoc,
          userDoc: userDoc || null,
        }}
      >
        {children}
      </FirebaseContext.Provider>
    </>
  );
};

export default FirebaseContext;
