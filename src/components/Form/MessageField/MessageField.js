import React from "react";

function MessageField({ item, register, errors }) {
  return (
    <div>
      <p className="form__item">
        <label className="form__label" htmlFor={item.name}>{item.label}</label>
        <textarea
          placeholder={item.placeholder}
          className="form__mess"
          name={item.name}
          id={item.name}
          { ...register }
        />
      </p>
      { errors && <p className="form--error">{ errors.message }</p> }
    </div>
  );
}

export default MessageField;
