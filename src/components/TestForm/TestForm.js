import "./TestForm.scss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const nameRegExp = /[a-zA-zа-яА-яёЁ]$/;
const loginRegExp = /[a-zA-Z0-9-_]$/;
const phoneRegExp = /[\+7][0-9]{10}$/;
const mailRegExp = /^[a-zA-z0-9-._]+@[a-z0-9-_]+\.[a-z0-9-_]{2,6}/ui;
const passRegExp = /[a-zA-Z0-9-_]$/;

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
    .matches( loginRegExp, "Допускаются только латинские буквы, символы '-' или '_'" )
    .min( 2, "В этом поле должно быть не менее 2-х символов" )
    .max( 20, "В этом поле должно быть не более 20-х символов" ),

  message: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .min( 2, "В этом поле должно быть не менее 2-х символов" ),

  phone: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( phoneRegExp, "Телефон должен соответствовать виду: +79172546925" ),

  // number: yup
  //   .number()
  //   .required( "Пожалуйста, заполните это поле" )
  //   .positive( "Цифры должны быть только положительными" )
  //   .integer( "Цифры должны быть целыми" ),

  email: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( mailRegExp, "Неправильно заполнен email" ),

  password: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( passRegExp, "Допускаются только латинские буквы, символы '-' или '_'" )
    .min( 8, "В этом поле должно быть не менее 8-ми символов" )
    .max( 20, "В этом поле должно быть не более 20-х символов" ),

  confirmPassword: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .oneOf( [ yup.ref( "password" ) ], "Значение этого поля должно совпадать со значением поля 'Пароль'" )
} );

function TestForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm( {
    resolver: yupResolver( schema ),
    mode: "onBlur",
  } );
  const [ isMessageSent, setMessageSent ] = useState( 0 );

  const onSubmit = (data) => {
    console.log( "click" );
    console.log( data );
    setMessageSent( 1 );
    setTimeout( () => {
      setMessageSent( 0 );
      reset();
    }, 3000 );
  };

  const onError = (errors, e) => console.log( errors, e );

  return (
    <>
      <h1 className="form__title">Тестовая форма, сделанная с помощью react-hook-form и yup</h1>
      <h2 className="form__subtitle">Анкета посетителя ресторана</h2>

      <form className="form" action="#"
            onSubmit={ handleSubmit( onSubmit, onError ) }
      >
        <fieldset className="form__fieldset">
          <legend className="form__legend">Контактная информация</legend>
        <div className="placeholder-container">
          <input
            className={ errors.name ? "form__input form__input--error" : "form__input" }
            { ...register( "name" ) }
            type="text"
            name="name"
            // placeholder=" "
          
          />
          <label className="form__label">Имя</label>
          { errors.name && <p className="form__mess--error">{ errors.name.message }</p> }
        </div>
        {/*<div className="placeholder-container">*/}
        {/*  <input*/}
        {/*    className={ errors.login ? "form__input form__input--error" : "form__input" }*/}
        {/*    { ...register( "login" ) }*/}
        {/*    type="text"*/}
        {/*    name="login"*/}
        {/*    placeholder=" "/>*/}
        {/*  <label className="form__label">Логин</label>*/}
        {/*  { errors.login && <p className="form__mess--error">{ errors.login.message }</p> }*/}
        {/*</div>*/}
        <div className="placeholder-container">
          <input
            className={ errors.name ? "form__input form__input--error" : "form__input" }
            { ...register( "email" ) }
            type="email"
            name="email"
            placeholder=" "/>
          <label className="form__label">Эл. почта</label>
          { errors.email && <p className="form__mess--error">{ errors.email.message }</p> }
        </div>
        <div className="placeholder-container">
          <input
            className={ errors.phone ? "form__input form__input--error" : "form__input" }
            { ...register( "phone" ) }
            type="tel"
            name="phone"
            placeholder=" "/>
          <label className="form__label">Телефон</label>
          { errors.phone && <p className="form__mess--error">{ errors.phone.message }</p> }
        </div>
          </fieldset>

        <fieldset className="form__fieldset">
          <legend className="form__legend">Персональная информация</legend>
          <div className="placeholder-container">
            <input type="number"/>
            <label ></label>
          </div>
        <div className="placeholder-container">
          <textarea
            className={ errors.message ? "form__input form__input--error form__mess" : "form__input form__mess" }
            { ...register( "message" ) }

            name="message"
            placeholder=" "/>
          <label className="form__label">Message</label>
          { errors.message && <p className="form__mess--error">{ errors.message.message }</p> }
        </div>
        </fieldset>

        <fieldset className="form__fieldset">
          <legend className="form__legend">Персональная информация</legend>
        <div className="placeholder-container">
          <input
            className={ errors.password ? "form__input form__input--error" : "form__input" }
            { ...register( "password" ) }
            type="password"
            name="password"
            placeholder=" "/>
          <label className="form__label">Пароль</label>
          { errors.password && <p className="form__mess--error">{ errors.password.message }</p> }
        </div>
        <div className="placeholder-container">
          <input
            className={ errors.confirmPassword ? "form__input form__input--error" : "form__input" }
            { ...register( "confirmPassword" ) }
            type="password"
            name="confirmPassword"
            placeholder=" "/>
          <label className="form__label">Повторите пароль</label>
          { errors.confirmPassword && <p className="form__mess--error">{ errors.confirmPassword.message }</p> }
        </div>
      </fieldset>
        <button type="submit" className="form__btn">Отправить</button>

      </form>
      { isMessageSent ? <p>Ваше сообщение отправлено</p> : null }
    </>
  );
}

export default TestForm;