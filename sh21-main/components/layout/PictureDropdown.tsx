import Image from "next/image";
import Link from "next/link";
import { FC, useContext, useRef, useState } from "react";

import FirebaseContext from "context/firebaseContext";
import { useOutside } from "hooks";

import SignOut from "icons/SignOut.svg";
import UserIcon from "icons/UserIcon.svg";

interface props {
  profile: string;
  name: string;
}

let Profile: FC<props> = ({ name, profile }) => {
  let [menuOpen, setMenuOpen] = useState(false);
  const { signOut } = useContext(FirebaseContext);

  let ref = useRef(null);

  useOutside(ref, () => {
    setMenuOpen(false);
  });

  return (
    <div ref={ref} className="">
      <Image
        width="100"
        height="100"
        alt="Profile Picture"
        className="h-14 w-14 rounded-full"
        src={profile}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      />
      <div
        id="menu"
        className={
          "absolute z-10 grid origin-top grid-cols-1 divide-y overflow-hidden rounded-md bg-white px-2 transition-all duration-200 " +
          (menuOpen ? "h-24" : "h-0")
        }
      >
        <button className="text-xl">{name}</button>
        <Link href="/profile">
          <button className="flex flex-row justify-between font-bold">
            Your Profile <UserIcon height="1e," />
          </button>
        </Link>
        <button
          className="flex flex-row justify-between font-bold text-red-600"
          onClick={() => {
            signOut!();
            window.location.assign("/");
          }}
        >
          Logout
          <SignOut height="1em" />
        </button>
      </div>
    </div>
  );
};
export default Profile;
