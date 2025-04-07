import { NextPage } from "next";
import Link from "next/link";
import { useContext, useRef, useState } from "react";

import FirebaseContext from "context/firebaseContext";
import { useOutside } from "hooks";

import Ellipsis from "icons/Ellipsis.svg";

let EllipsisDropdown: NextPage = () => {
  let [menuOpen, setMenuOpen] = useState(false);

  const { user } = useContext(FirebaseContext);

  let ref = useRef(null);

  useOutside(ref, () => {
    setMenuOpen(false);
  });

  return (
    <div ref={ref} className="">
      <Ellipsis
        className="h-auto w-full"
        onClick={() => {
          return setMenuOpen(!menuOpen);
        }}
      />

      <div
        id="inBetweenDropdown"
        className={
          "invisible sm:visible absolute z-10 grid origin-top grid-cols-1 divide-y overflow-hidden rounded-md bg-white px-2 transition-all duration-200 " +
          (menuOpen ? "h-auto w-auto" : "h-0 w-0")
        }
      >
        <Link href="/build-cv">
          <button className="">Build CV</button>
        </Link>

        <a href="https://business.bobbll.com/login" className="font-bold">
          For Cool Employers
        </a>
      </div>

      <div
        id="smallDropdown"
        className={
          "visible sm:invisible absolute z-10 grid origin-top grid-cols-1 divide-y overflow-hidden rounded-md bg-white px-2 transition-all duration-200 " +
          (menuOpen ? "h-auto w-auto" : "h-0 w-0")
        }
      >
        <Link href="/build-cv">
          <button className="">Build CV</button>
        </Link>

        <Link href="/discover">
          <button className="text-left">Discover Companies</button>
        </Link>

        {user ? (
          <Link href="swipe" className="">
            Swipe!
          </Link>
        ) : (
          ""
        )}

        <a href="https://business.bobbll.com/login" className="font-bold">
          For Cool Employers
        </a>
      </div>
    </div>
  );
};
export default EllipsisDropdown;
