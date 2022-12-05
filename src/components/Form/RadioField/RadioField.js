import React from "react";

function RadioField({ item, register, selectedOption, handleChangeRadio }) {
  return (
    <div>
      <p className="form__item form__item--position--left form__item--position--left">
        <input
          className="form__check"
          type="radio"
          name={ item.name }
          value={ item.value }
          id={ item.value }
          { ...register }
          checked={selectedOption === item.value}
          onChange={ handleChangeRadio }
        />
        <label className="form__label form__label--wide" htmlFor={ item.value }>{ item.label }</label>
      </p>
    </div>
  );
}

export default RadioField;