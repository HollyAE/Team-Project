import { NextPage } from "next";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";

import Header from "@c./profile/ProfileHeader";
import FirebaseContext from "context/firebaseContext";
import { useUpdateUserDoc, useUserDoc } from "hooks";

let Profile: NextPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDOB] = useState("");
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [verified, setVerified] = useState(false);
  const [fnamebackup, setFnameBackup] = useState("");

  const userDoc = useUserDoc();

  useEffect(() => {
    if (userDoc?.firstName) {
      setFirstName(userDoc.firstName);
      setFnameBackup(userDoc.firstName);
    }

    if (userDoc?.lastName) {
      setLastName(userDoc.lastName);
    }

    if (userDoc?.displayName) {
      setDisplayName(userDoc.displayName);
    }

    if (userDoc?.email) {
      setEmail(userDoc.email);
    }

    if (userDoc?.phoneNumber) {
      setPhoneNumber(userDoc.phoneNumber);
    }

    if (userDoc?.profilePictureURL) {
      setProfilePictureURL(userDoc.profilePictureURL);
    }

    if (userDoc?.dateOfBirth) {
      setDOB(userDoc.dateOfBirth);
    }
  }, [userDoc]);

  const { user } = useContext(FirebaseContext);

  useEffect(() => {
    setVerified(user?.emailVerified!);
  }, [user]);

  const today = new Date()
    .toLocaleDateString("en-uk")
    .replaceAll("/", "-")
    .split("-")
    .reverse()
    .join("-");

  let updateUser = useUpdateUserDoc();

  let clickfunction = () => {
    if (firstName != "") {
      updateUser("firstName", firstName);
    }

    if (displayName != "") {
      updateUser("displayName", displayName);
    }

    if (email != "") {
      updateUser("email", email);
    }

    if (phoneNumber != "") {
      updateUser("phoneNumber", phoneNumber);
    }

    if (profilePictureURL != "") {
      updateUser("profilePictureURL", profilePictureURL);
    }

    if (dob != "") {
      updateUser("dateOfBirth", dob);
    }
  };

  return (
    <>
      <Header
        active="profile"
        verified={verified}
        firstName={firstName}
        fnamebackup={fnamebackup}
      />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="px-20 md:col-span-6">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                View and edit your details
              </p>
            </div>
          </div>
          <div className="mt-5 px-20 md:col-span-6 md:mt-0">
            <div>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="fname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="fname"
                        id="fname"
                        placeholder={firstName || "first name"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="sname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Surname
                      </label>
                      <input
                        type="text"
                        name="sname"
                        id="sname"
                        placeholder={lastName || "surname"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="dname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Display name
                      </label>
                      <input
                        type="text"
                        name="dname"
                        id="dname"
                        placeholder={displayName || "display name"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder={email || "email"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder={phoneNumber || "07123456789"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-700"
                      >
                        DOB
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        placeholder={dob || "0000-00-00"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        min="1900-01-01"
                        max={today}
                        onChange={(e) => setDOB(e.target.value)}
                        value={dob || "0000-00-00"}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label className="block font-medium text-gray-700">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center col-span-6 sm:col-span-3">
                        <img
                          className="h-40 pb-10 pr-20 pt-2"
                          src={profilePictureURL || "/default.jpg"}
                          alt="profile picture"
                        ></img>

                        <div className="justify-center first-letter:mt-1 flex rounded-md border-2 border-dashed border-gray-300 px-6 pb-5 pt-4">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) =>
                                    setProfilePictureURL(e.target.value)
                                  }
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>Scotland</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        County / Region
                      </label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postcode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postcode
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        id="postcode"
                        autoComplete="postcode"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex flex-row">
                  <Link href="/profile/delete" className="mr-auto">
                    <button className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mr-auto">
                      Delete Account
                    </button>
                  </Link>
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={clickfunction}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
};

export default Profile;
