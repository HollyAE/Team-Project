import Image from "next/image";
import Link from "next/link";
import { FC, useContext } from "react";

import Plus from "icons/Plus";

import EllipsisDropdown from "@c./layout/EllipsisDropdown";
import Profile from "@c./layout/PictureDropdown";
import FirebaseContext from "context/firebaseContext";

let Header: FC = () => {
  let { user } = useContext(FirebaseContext);

  return (
    <div id="pageHead" className="">
      <div
        id="mediumHeader"
        className="invisible medium:visible medium:flex medium:flex-row gap-x-10 w-full medium:p-3 bg-transparent [&>*]:ring-2 "
      >
        <div
          id="mediumMain"
          className="medium:flex medium:flex-row h-0 medium:h-20 w-0 medium:w-4/5 justify-space-around items-center rounded-full bg-white "
        >
          <div className="invisible medium:visible ml-10 flex-none">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width="138"
                height="36"
                style={{ userSelect: "none" }}
              />
            </Link>
          </div>

          <div className="invisible medium:visible flex-1 flex flex-row justify-evenly">
            <Link href="build-cv" className=" text-lg">
              Build CV
            </Link>

            <Link href="discover" className="text-lg">
              Discover Companies
            </Link>

            {user ? (
              <Link href="swipe" className="text-lg">
                Swipe!
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="invisible medium:visible medium:flex medium:flex-row flex-none mr-10">
            {user ? (
              <div className="from-pink-200 to-blue-400 bg-gradient-to-t rounded-full">
                <Profile
                  profile={user.photoURL || "/default.jpg"}
                  name={user.displayName || user.email || ""}
                />
              </div>
            ) : (
              <div className="from-pink-200 to-blue-400 bg-gradient-to-t rounded-full">
                <Link href="/auth/login">
                  <Plus />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div
          id="mediumEmployer"
          className="invisible medium:visible max-w-sm flex flex-row align-self-end justify-center items-center flex-wrap h-0 medium:h-20 w-0 medium:w-1/5 rounded-full bg-white "
        >
          <a
            href="https://business.bobbll.com/login"
            className="text-lg text-center"
          >
            For cool employers
          </a>
        </div>
      </div>

      <div
        id="inBetweenHeader"
        className="w-0 sm:w-full medium:w-0 p-0 sm:p-3 medium:p-0 bg-transparent"
      >
        <div
          id="inBetweenMain"
          className="invisible sm:visible medium:invisible flex flex-row w-0 sm:w-full medium:w-0 h-0 sm:h-20 medium:h-0  justify-between items-center rounded-full bg-white"
        >
          <div className="ml-10 ">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width="138"
                height="36"
                style={{ userSelect: "none" }}
              />
            </Link>
          </div>

          <div className="invisible w-0 sm:visible sm:w-96 medium:invisible sm:flex sm:flex-row flex-1 justify-evenly">
            <Link href="discover" className="text-lg">
              Discover Companies
            </Link>

            {user ? (
              <Link href="swipe" className="text-lg">
                Swipe!
              </Link>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-row flex-no-wrap mr-7 flex-shrink max-[350px]:mr-7">
            <div className="h-14 w-14">
              <EllipsisDropdown />
            </div>

            {user ? (
              <div className="from-pink-200 to-blue-400 bg-gradient-to-t rounded-full">
                <Profile
                  profile={user.photoURL || "/default.jpg"}
                  name={user.displayName || user.email || ""}
                />
              </div>
            ) : (
              <div className="from-pink-200 to-blue-400 bg-gradient-to-t rounded-full ">
                <Link href="/auth/login">
                  <Plus />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div id="smallHeader" className="w-full sm:w-0 p-3 sm:p-0 bg-transparent">
        <div
          id="smallMain"
          className="visible sm:invisible flex flex-row w-full sm:w-0 h-20 sm:h-0  justify-between items-center rounded-full bg-white"
        >
          <div className="ml-10 ">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width="138"
                height="36"
                style={{ userSelect: "none" }}
              />
            </Link>
          </div>

          <div className="flex flex-row flex-no-wrap mr-7 flex-shrink max-[350px]:mr-7">
            <div className="h-14 w-14">
              <EllipsisDropdown />
            </div>

            {user ? (
              <div className="from-pink-200 to-blue-400 bg-gradient-to-t rounded-full">
                <Profile
                  profile={user.photoURL || "/default.jpg"}
                  name={user.displayName || user.email || ""}
                />
              </div>
            ) : (
              <div className="from-pink-200 to-blue-400 bg-gradient-to-t rounded-full ">
                <Link href="/auth/login">
                  <Plus />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
