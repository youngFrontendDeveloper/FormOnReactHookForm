import React from "react";

function EmailField({item, register, errors}) {
  return (
    <div key={item.id}>
      <p className="form__item">
        <label className="form__label" htmlFor={ item.name} >
          {item.label}
        </label>
        <input
          type="email"
          className={ errors ? "form__input form__input--error" : "form__input" }
          name={ item.name}
          id={item.name}
          placeholder={item.placeholder}
          { ...register }
        />
      </p>
      { errors && <p className="form--error">{ errors.message }</p> }
    </div>
  );
}

export default EmailField;