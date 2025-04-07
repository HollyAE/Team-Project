import type { FC } from "react";
import React from "react";

interface props {
  setStageFlag: React.Dispatch<React.SetStateAction<boolean>>;
  newUser: user;
  setNewUser: React.Dispatch<React.SetStateAction<user>>;
}

let DetailsForm: FC<props> = ({ setStageFlag, newUser, setNewUser }) => {
  let { firstName, lastName, dateOfBirth } = newUser;

  //if any one of these is empty, then disabled=true
  let disabled = !firstName || !lastName || !dateOfBirth;

  const today = new Date()
    .toLocaleDateString("en-uk")
    .replaceAll("/", "-")
    .split("-")
    .reverse()
    .join("-");

  return (
    <>
      <h1 className="font-extrabold text-left text-5xl">
        Let&apos;s get started...
      </h1>
      <form
        className="mt-10 flex flex-col justify-center"
        onSubmit={(e) => {
          setStageFlag(false);
          e.preventDefault();
        }}
      >
        {disabled && (
          <h3 className="text-red-600">
            Please check fields are entered correctly
          </h3>
        )}
        <h2 className="font-bold mt-10">First Name:</h2>
        <input
          className="border-2 rounded-full flex justify-center"
          type="text"
          id="firstName"
          name="firstName"
          onChange={(e) =>
            setNewUser({ ...newUser, firstName: e.target.value })
          }
        ></input>
        <h2 className="font-bold">Surname:</h2>
        <input
          className="border-2 rounded-full"
          type="text"
          id="sname"
          name="sname"
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
        ></input>
        <h2 className="font-bold">Date of Birth:</h2>
        <input
          id="dob"
          type="date"
          className="border-2 rounded-full text-center"
          min="1900-01-01"
          max={today}
          onChange={(e) =>
            setNewUser({ ...newUser, dateOfBirth: e.target.value })
          }
        />
        <h2 className="font-bold">Display Name</h2>
        <input
          className="border-2 rounded-full"
          type="text"
          id="displayname"
          name="displayname"
          onChange={(e) => {
            setNewUser({ ...newUser, displayName: e.target.value });
          }}
        ></input>
        <input
          id="submitbutton"
          type="submit"
          value="Next"
          className="rounded-full to-blue-600 from-pink-400 bg-gradient-to-t flex justify-center mr-auto ml-auto mt-5 w-44 h-20 align-middle"
          disabled={disabled}
        ></input>
      </form>
    </>
  );
};

export default DetailsForm;
