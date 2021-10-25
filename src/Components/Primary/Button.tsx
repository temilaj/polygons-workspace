import React from 'react';

type Props = {
  text: string;
  onClick: () => void;
  danger?: boolean;
};

export default function Button(props: Props) {
  const handleClick = () => {
    props.onClick();
  };

  return (
    <button className={`button ${props.danger ? 'danger' : ''}`} onClick={handleClick}>
      {props.text}
    </button>
  );
}
