import React from "react";

function NumberField({ item, register, errors }) {
  return (
    <div>
      <p className="form__item">
        <label className="form__label" htmlFor={item.name}>{ item.label }</label>
        <input type="number"
               placeholder={ item.placeholder }
               className={ errors ? "form__input form__input--error" : "form__input" }
               name="age"
               id="age"
               { ...register }
        />
      </p>
      { errors && <p className="form--error">{ errors.message }</p> }
    </div>
  );
}

export default NumberField;