import React from "react";

type ButtonProps = {
  label: string;
};

const Sample: React.FC<ButtonProps> = ({ label }) => {
  return <button>{label}</button>;
};

export default Sample;
