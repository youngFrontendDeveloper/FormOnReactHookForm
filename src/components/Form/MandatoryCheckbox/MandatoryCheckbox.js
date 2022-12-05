import React from "react";

function MandatoryCheckbox({ item, register, errors, }) {
  return (
    <div key={item.id}>
      <p className="form__item form__item--position--left">

        <input
          type="checkbox"
          className="form__check"
          name={ item.name}
          id={item.name}
          placeholder={item.placeholder}
          { ...register }
        />
        <label className="form__label form__label--wide" htmlFor={ item.name} >
          {item.label}
        </label>
      </p>
      { errors && <p className="form--error">{ errors.message }</p> }
    </div>
  )
}

export default MandatoryCheckbox;