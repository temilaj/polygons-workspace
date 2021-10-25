import React from "react";

type Props = {
  text: string;
  onClick: () => void;
};

export default function Button(props: Props) {
  const handleClick = () => {
    props.onClick();
  };

  return (
    <button className="button" onClick={handleClick}>
      {props.text}
    </button>
  );
}
