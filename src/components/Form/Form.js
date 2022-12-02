import "./Form.scss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const nameRegExp = /[a-zA-zа-яА-яёЁ]$/;
const phoneRegExp = /[+7][0-9]{10}$/;
const mailRegExp = /^[a-zA-z0-9-._]+@[a-z0-9-_]+\.[a-z0-9-_]{2,6}/ui;
const ageRegExp = /^[0-9]{1,3}$/;
// const loginRegExp = /[a-zA-Z0-9-_]$/;
// const passRegExp = /^[a-zA-Z0-9-_]$/;

const schema = yup.object().shape( {
  name: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( nameRegExp, "Допускаются только латинские или кирилические буквы" )
    .min( 2, "В этом поле должно быть не менее 2-х символов" )
    .max( 15, "В этом поле должно быть не более 15-х символов" ),

  message: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .min( 2, "В этом поле должно быть не менее 2-х символов" ),

  phone: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( phoneRegExp, "Телефон должен соответствовать виду: +79172546925" ),

  date: yup
    .string()
    .required( "Пожалуйста, заполните это поле" ),

  age: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .min( 1, "В этом поле должно быть не менее одного символа" )
    .max( 3, "В этом поле должно быть не более 3-х символов" )
    .matches( ageRegExp, "Это поле должно содержать только целые положительные числа" ),

  email: yup
    .string()
    .required( "Пожалуйста, заполните это поле" )
    .matches( mailRegExp, "Неправильно заполнен email" ),

  consent: yup
    .bool()
    .oneOf( [ true ], "Пожалуйста, отметьте это поле" ),

  select: yup
    .string()
    .required( "Пожалуйста, выберите подходящее значение" ),


  // number: yup
  // .number()
  // .required( "Пожалуйста, заполните это поле" )
  // .min(1, "В этом поле должно быть не менее одного символа")
  // .max(3, "В этом поле должно быть не более 3-х символов")
  // .positive( "Цифры должны быть только положительными" )
  // .integer( "Цифры должны быть целыми" ),

  // login: yup
  //   .string()
  //   .required( "Пожалуйста, заполните это поле" )
  //   .matches( loginRegExp, "Допускаются только латинские буквы, символы '-' или '_'" )
  //   .min( 2, "В этом поле должно быть не менее 2-х символов" )
  //   .max( 20, "В этом поле должно быть не более 20-х символов" ),

  // password: yup
  //   .string()
  //   .required( "Пожалуйста, заполните это поле" )
  //   .matches( passRegExp, "Допускаются только латинские буквы, символы '-' или '_'" )
  //   .min( 8, "В этом поле должно быть не менее 8-ми символов" )
  //   .max( 20, "В этом поле должно быть не более 20-х символов" ),
  //
  // confirmPassword: yup
  //   .string()
  //   .required( "Пожалуйста, заполните это поле" )
  //   .oneOf( [ yup.ref( "password" ), null ], "Значение этого поля должно совпадать со значением поля 'Пароль'" )
} );


function Form() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm( {
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

  const onError = (errors, e) => console.log( errors, e );

  const handleFocus = (e) => {
    e.target.type = "date";
  };

  return (
    <>
      <form action="#" className="form" onSubmit={ handleSubmit( onSubmit, onError ) }>
        <h1 className="form__title">Тестовая форма, сделанная с помощью <br/>react-hook-form и yup</h1>
        <h2 className="form__subtitle">Анкета посетителя ресторана</h2>
        <fieldset className="form__fieldset">
          <legend className="form__legend">Контактная информация</legend>
          <p className="form__item"><label className="form__label" htmlFor="name">Имя</label>
            <input
              type="text"
              className={ errors.name ? "form__input form__input--error" : "form__input" }
              name="name"
              id="name"
              placeholder="Петр"
              { ...register( "name" ) }/>
          </p>
          { errors.name && <p className="form--error">{ errors.name.message }</p> }
          <p className="form__item"><label className="form__label" htmlFor="phone">Телефон</label>
            <input
              type="text"
              className={ errors.phone ? "form__input form__input--error" : "form__input" }
              name="phone"
              id="phone"
              placeholder="+79275681452"
              { ...register( "phone" ) }/>
          </p>
          { errors.phone && <p className="form--error">{ errors.phone.message }</p> }
          <p className="form__item"><label className="form__label" htmlFor="email">Эл. почта</label>
            <input
              type="text"
              className={ errors.email ? "form__input form__input--error" : "form__input" }
              name="email"
              id="email"
              placeholder="mail@mail.ru"
              { ...register( "email" ) }/>
          </p>
          { errors.email && <p className="form--error">{ errors.email.message }</p> }
          <p className="form__item"><label className="form__label" htmlFor="date">Дата посещения</label>
            <input
              type="text"
              placeholder="дд/мм/гггг"
              className={ errors.date ? "form__input form__input--error" : "form__input" }
              name="date"
              id="date"
              { ...register( "date" ) }
              onFocus={ handleFocus }
            />
          </p>
          { errors.date && <p className="form--error">{ errors.date.message }</p> }
          <p className="form__item form__item--position--left">
            <input className={ errors.consent ? "form__check form__input--error" : "form__check" }
                   type="checkbox"
                   name="consent"
                   id="consent"
                   { ...register( "consent" ) }
            />
            <label className="form__label form__label--wide" htmlFor="consent">Даю согласие на обработку моих
              персональных
              данных</label>
          </p>
          { errors.consent && <p className="form--error">{ errors.consent.message }</p> }
        </fieldset>

        <fieldset className="form__fieldset">
          <legend className="form__legend">Персональная информация</legend>
          <p className="form__item">
            <label className="form__label" htmlFor="age">Возраст</label>
            <input type="number"
                   placeholder="18"
                   className={ errors.age ? "form__input form__input--error" : "form__input" }
                   name="age"
                   id="age"
                   { ...register( "age" ) }
            />
          </p>
          { errors.age && <p className="form--error">{ errors.age.message }</p> }
          <p className="form__item">

            <label className="form__label" htmlFor="cuisine">Любимая кухня</label>
            <select
              className={ errors.cuisine ? "form__select form__select--error" : "form__select" }
              placeholder="Выберите кухню"
              name="cuisine"
              id="cuisine"
              { ...register( "select" ) }
              onChange={(e) => setValue('select', e.target.value, { shouldValidate: true })}
            >
              <option className="form__option" value="" disabled selected hidden>- Выберите подходящее значение -</option>
              <option className="form__option" value="russian">Русская</option>
              <option className="form__option" value="japanese">Японская</option>
              <option className="form__option" value="italian">Итальянская</option>
            </select>
          </p>
          { errors.cuisine && <p className="form--error">{ errors.cuisine.message }</p> }
          <p className="form__item">
            <label className="form__label" htmlFor="message">Какие блюда Вы хотели бы увидеть в меню?</label>
            <textarea
              placeholder="Блины со сгущенкой"
              className="form__mess"
              name="message"
              id="message"
              { ...register( "message" ) }
            />
          </p>
          { errors.message && <p className="form--error">{ errors.message.message }</p> }
        </fieldset>
        <fieldset className="form__fieldset">
          <legend className="form__legend">Оценка нашего заведения</legend>
          <p className="form__question">Почему Вы выбрали наше заведение?</p>

          <p className="form__item form__item--position--left form__item--position--left">
            <input className={ errors.near ? "form__check form__input--error" : "form__check" }
                   type="checkbox"
                   name="near"
                   id="near"
                   { ...register( "near" ) }
            />
            <label className="form__label form__label--wide" htmlFor="near">Недалеко от дома/работы</label>
          </p>
          <p className="form__item form__item--position--left">
            <input className={ errors.advertising ? "form__check form__input--error" : "form__check" }
                   type="checkbox"
                   name="advertising"
                   id="advertising"
                   { ...register( "advertising" ) }
            />
            <label className="form__label form__label--wide" htmlFor="advertising">Увидел рекламу</label>
          </p>
          <p className="form__item form__item--position--left">
            <input className={ errors.advice ? "form__check form__input--error" : "form__check" }
                   type="checkbox"
                   name="advice"
                   id="advice"
                   { ...register( "advice" ) }
            />
            <label className="form__label form__label--wide" htmlFor="advice">Посоветовали</label>
          </p>
          <p className="form__item form__item--position--left">
            <input className={ errors.quality ? "form__check form__input--error" : "form__check" }
                   type="checkbox"
                   name="quality"
                   id="quality"
                   { ...register( "quality" ) }
            />
            <label className="form__label form__label--wide" htmlFor="quality">Оптимальное соотношение
              цены/качества</label>
          </p>

          <p className="form__question">Вы будете рекомендовать наше заведение своим знакомым?</p>
          <p className="form__item form__item--position--left form__item--position--left">
            <input className={ errors.recommend ? "form__check form__input--error" : "form__check" }
                   type="radio"
                   name="recommend"
                   id="yes"
                   checked
                   { ...register( "recommend" ) }
            />
            <label className="form__label form__label--wide" htmlFor="yes">Да</label>
          </p>
          <p className="form__item form__item--position--left">
            <input className={ errors.recommend ? "form__check form__input--error" : "form__check" }
                   type="radio"
                   name="recommend"
                   id="not"
                   { ...register( "recommend" ) }
            />
            <label className="form__label form__label--wide" htmlFor="not">Нет</label>
          </p>
        </fieldset>

        <button type="submit" className="form__btn">Отправить</button>
      </form>
      { isMessageSent ? <p>Ваше сообщение отправлено</p> : null }
    </>
  );
}

export default Form;