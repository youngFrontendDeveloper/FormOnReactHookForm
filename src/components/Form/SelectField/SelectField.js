import React from "react";

function SelectField({ item, register, errors, isFirstOption, handleChangeSelect }) {
  return (
    <div>
      <p className="form__item form__item--position--relative">

        <label className="form__label" htmlFor={ item.name }>Любимая кухня</label>
        { isFirstOption ?
          <span className="form__option-first"
          >Выберите значение</span> : null }
        <select
          className={ errors ? "form__select form__select--error" : "form__select" }
          placeholder={ item.placeholder }
          name={ item.name }
          id={ item.name }
          { ...register }

          onChange={
            handleChangeSelect
          }
        >
          {
            Object.entries( item.options ).map( i => {
              return (
                <option className="form__option" value={ i[ 0 ] } key={ i[ 0 ] }
                        hidden={ i[ 0 ] === " " ? "hidden" : null }>{ i[ 1 ] }</option>
              );
            } )

          }
        </select>
      </p>
      { errors && <p className="form--error">{ errors.message }</p> }
    </div>
  );
}

export default SelectField;