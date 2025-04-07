import { FC } from "react";

interface props {
  height?: number;
  color?: string;
}

let ChevronLeft: FC<props> = ({ height, color }) => {
  if (!height) {
    height = 5;
  }

  return (
    <div>
      <svg
        className={"h-" + height + " hover:opacity-100 opacity-50"}
        fill={color ? color : ""}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
      </svg>
    </div>
  );
};

export default ChevronLeft;
