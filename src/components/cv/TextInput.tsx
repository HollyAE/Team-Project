import { Dispatch, FC, SetStateAction } from "react";

import { useUpdateCVDoc } from "hooks";

//This component is used for text input, and update the firebase with the input if necessary. Only used in CV stuff.

//Props are pretty similar to SelectedInput.tsx
//description, long and smalltext are used to switch out sections of the text input
interface props {
  placeholder: string;
  setVariable: Dispatch<SetStateAction<any>>;
  variable: any;
  long?: boolean;
  smalltext?: boolean;
  firebaseField?: string;
}

let TextInput: FC<props> = ({
  placeholder,
  setVariable,
  variable,
  long,
  smalltext,
  firebaseField,
}) => {
  let updateCV = useUpdateCVDoc();
  return long ? (
    <textarea
      placeholder={placeholder}
      className="bg-gray-200 text-gray-600 placeholder-gray-600 text-md x-small:text-xl sm:text-3xl text-center h-96 w-full rounded-xl"
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) => (e.target.placeholder = placeholder)}
      onChange={(e) => {
        setVariable(e.target.value);
        if (firebaseField) updateCV(firebaseField, e.target.value);
      }}
      value={variable}
    />
  ) : (
    <input
      type="text"
      placeholder={placeholder}
      className={
        "bg-gray-200 text-gray-600 placeholder-gray-600 w-full text-center " +
        (smalltext ? "" : " text-md x-small:text-xl sm:text-3xl")
      }
      onFocus={(e) => (e.target.placeholder = "")}
      onBlur={(e) => (e.target.placeholder = placeholder)}
      onChange={(e) => {
        setVariable(e.target.value);
        if (firebaseField) updateCV(firebaseField, e.target.value);
      }}
      value={variable}
    ></input>
  );
};

export default TextInput;
