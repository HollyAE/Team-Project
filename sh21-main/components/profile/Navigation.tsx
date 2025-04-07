import Link from "next/link";
import type { FC } from "react";

interface props {
  active: "profile" | "skills" | "applications";
}

let Navigation: FC<props> = ({ active }) => {
  return (
    <div className="px-4 sm:px-0">
      <h3 className="py-4 text-lg font-medium leading-6 text-gray-900">
        Profile Navigation
      </h3>
      <Link
        href="/profile"
        className={`text-gray-600ml-5 mt-1 rounded-md border border-gray-300  py-2 px-4 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          active === "profile" ? "bg-gray-300" : "bg-white"
        }`}
      >
        My Details
      </Link>
      <Link
        href="/build-cv"
        className="text-gray-600ml-5 mt-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        My CV
      </Link>
      <Link
        href="/profile/skills"
        className={`text-gray-600ml-5 mt-1 rounded-md border border-gray-300  py-2 px-4 text-sm font-medium leading-4 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          active === "skills" ? "bg-gray-300" : "bg-white"
        }`}
      >
        My Skills
      </Link>
      <Link
        href="/profile/applications"
        className={`text-gray-600ml-5 mt-1 rounded-md border border-gray-300 py-2 px-4 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          active === "applications" ? "bg-gray-300" : "bg-white"
        }`}
      >
        My Applications
      </Link>
    </div>
  );
};

export default Navigation;
