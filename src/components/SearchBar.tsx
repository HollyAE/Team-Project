import { forwardRef } from "react";

import SearchIcon from "icons/SearchIcon";

//Used to show a search bar and get the input from a user.

//Ref isn't used, but could be used to click on the search icon and automatically selected the box
//Dynamic onChange and onKeyUp functions are passed in
//placeholder and noIcon are used to style the component as needed
interface content {
  search: string;
  onChange?(e: any): void;
  onKeyUp?(ev: any): void;
  placeholder?: string;
  noIcon?: boolean;
}

let SearchBar = forwardRef<HTMLInputElement, content>(
  ({ search, onChange, onKeyUp, placeholder, noIcon }, ref) => {
    return (
      <div className="border-black border-solid border-2 rounded-xl align-middle w-full sm-md:w-3/4 h-10 flex flex-row ">
        {noIcon ? (
          ""
        ) : (
          <div className="ml-2 h-6 w-6">
            <SearchIcon />
          </div>
        )}
        <input
          ref={ref}
          autoComplete="off"
          id="input"
          type="text"
          value={search}
          onClick={(e) => {
            e.preventDefault();
          }}
          onChange={onChange ? onChange : () => {}}
          className="text-xs sm-md:text-sm sm:text-lg px-2 pt-1 rounded-full h-fit w-full outline-none"
          onKeyUp={onKeyUp ? onKeyUp : () => {}}
          placeholder={placeholder}
        ></input>
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
