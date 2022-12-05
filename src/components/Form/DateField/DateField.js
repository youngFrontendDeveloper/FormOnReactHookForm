import React from "react";

function DateField({item, register, errors, typeOfDate, handleFocus,}) {

  return (
    <div key={item.id}>
      <p className="form__item">
        <label className="form__label" htmlFor={ item.name} >
          {item.label}
        </label>
        <input
          type={ typeOfDate }
          className={ errors? "form__input form__input--error" : "form__input" }
          name={ item.name}
          id={item.name}
          placeholder={item.placeholder}
          { ...register }
          onFocus={ handleFocus }
        />
      </p>
      { errors && <p className="form--error">{ errors.message }</p> }
    </div>
  );
}

export default DateField;