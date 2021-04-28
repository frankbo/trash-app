import React from "react";
import { Headline } from "./Headline";

interface Props {
  date: Date;
}

export const Delimiter: React.FC<Props> = ({ date }) => {
  return (
    <Headline>{`${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`}</Headline>
  );
};
