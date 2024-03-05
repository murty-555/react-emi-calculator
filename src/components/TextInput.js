import React from "react";

const TextInput = ({title,value,setState,}) => {
  return (
    <>
      <span className="title">{title}</span>
      <input
        value={value}
        onChange={(e) => setState(e.target.value)}
        type="number"
        placeholder={title}
      />
    </>
  );
};

export default TextInput;
