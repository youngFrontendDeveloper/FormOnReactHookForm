import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const nameRegExp = /[a-zA-zа-яА-яёЁ]S/;
const loginRegExp = /[a-zA-Z0-9-_]$/;
const phoneRegExp = /[\+7][0-9]{10}$/;
const mailRegExp = /^[a-zA-z0-9-._]+@[a-z0-9-_]+\.[a-z0-9-_]{2,6}/ui;

const schema = yup.object().shape( {
  name: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( nameRegExp, "Допускаются только латинские или кирилические буквы" )
    .min( 2, "В этом поле должно быть не менее 2-х символов" )
    .max( 15, "В этом поле должно быть не более 15-х символов" ),

  login: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( loginRegExp, "Допускаются только латинские буквы,символы - или _" )
    .min( 2, "В этом поле должно быть не менее 2-х символов" )
    .max( 15, "В этом поле должно быть не более 15-х символов" ),

  phone: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( phoneRegExp, "Телефон должен соответствовать виду: +79172546925" ),

  number: yup
    .number()
    .required( "Пожалуйста, заполните это поле" )
    .positive( "Цифры должны быть только положительными" )
    .integer( "Цифры должны быть целыми" ),

  email: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( mailRegExp, "Неправильно заполнен email" ),

} );

function Form() {
  const { register, handleSubmit, reset, formState: { errors }, } = useForm( {
    resolver: yupResolver( schema ),
    mode: "onBlur",
  } );
  const [ isMessageSent, setMessageSent ] = useState( 0 );

  const onSubmit = (data) => {
    console.log( data );
    setMessageSent( 1 );
    setTimeout( () => {
      setMessageSent( 0 );
      reset();
    }, 3000 );
  };

  return (
    <form className="form" action="#" method="post" onSubmit={ handleSubmit( onSubmit ) }>
      <input
        className={ errors.name ? "form__item form__item--error" : "form__item" }
        { ...register( "name" ) }
        type="text"
        name="name"
        placeholder="Name"/>
      { errors.name && <p className="form--error">{ errors.name.message }</p> }

      <button
        className="form__item form__btn"
        type="submit">Отправить
      </button>
    </form>
  );
}

export default Form;