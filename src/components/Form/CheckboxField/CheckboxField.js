import React from "react";

function CheckboxField({ item, register, }) {
  return (
    <div>
      <p className="form__item form__item--position--left form__item--position--left">
        <input
          className="form__check"
          type="checkbox"
          name={ item.name }
          id={ item.name }
          { ...register }
        />
        <label className="form__label form__label--wide" htmlFor={ item.name }>{ item.label }</label>
      </p>
    </div>
  );
}

export default CheckboxField;