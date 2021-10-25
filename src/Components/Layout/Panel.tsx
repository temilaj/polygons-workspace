import React from "react";

type Props = {
  children: React.ReactChild;
};

function Panel(props: Props) {
  return <aside className="panel">{props.children}</aside>;
}

export default Panel;
