import "./Form.scss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "./TextField/TextField";
import EmailField from "./EmailField/EmailField";
import DateField from "./DateField/DateField";
import MandatoryCheckbox from "./MandatoryCheckbox/MandatoryCheckbox";
import NumberField from "./NumberField/NumberField";
import MessageField from "./MessageField/MessageField";
import SelectField from "./SelectField/SelectField";
import CheckboxField from "./CheckboxField/CheckboxField";
import RadioField from "./RadioField/RadioField";

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
    .matches( nameRegExp, "Допускаются только латинские или кириллические буквы" )
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
    .max( 2, "В этом поле должно быть не более 2-х символов" )
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

const formFields1 = [
  {
    type: "text",
    name: "name",
    placeholder: "Иван",
    label: "Имя"
  },
  {
    type: "text",
    name: "phone",
    placeholder: "+79275681452",
    label: "Телефон"
  },
  {
    type: "email",
    name: "email",
    placeholder: "mail@mail.ru",
    label: "Эл. почта"
  },
  {
    type: "date",
    name: "date",
    placeholder: "дд/мм/гггг",
    label: "Дата посещения"
  },
  {
    type: "mandatoryCheckbox",
    name: "consent",
    placeholder: " ",
    label: "Даю согласие на обработку моих персональных данных"
  },
];

const formFields2 = [
  {
    type: "number",
    name: "age",
    id: "age",
    placeholder: "18",
    label: "Возраст"
  },
  {
    type: "select",
    name: "cuisine",
    id: "cuisine",
    placeholder: "18",
    label: "Любимая кухня",
    options: {
      " ": " ",
      russian: "Русская",
      japanese: "Японская",
      italian: "Итальянская",
      other: "Другая"
    }
  },
  {
    type: "message",
    name: "message",
    id: "message",
    placeholder: "Блины со сгущенкой",
    label: "Какие блюда Вы хотели бы увидеть в меню?"
  },
];

const formFields3 = [
  {
    name: "near",
    id: "near",
    label: "Недалеко от дома/работы"
  },
  {
    name: "advertising",
    id: "advertising",
    label: "Увидел рекламу"
  },
  {
    name: "advice",
    id: "advice",
    label: "Посоветовали"
  },
  {
    name: "quality",
    id: "quality",
    label: "Оптимальное соотношение цены/качества"
  },
];

const formFields4 = [
  {
    name: "recommend",
    value: "true",
    label: "Да"
  },
  {
    name: "recommend",
    value: "false",
    label: "Нет"
  },
  {
    name: "recommend",
    value: "don't know",
    label: "Не знаю"
  },
];

function Form() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm( {
    resolver: yupResolver( schema ),
    mode: "onTouched",
  } );
  const [ isMessageSent, setMessageSent ] = useState( 0 );
  const [ isFirstOption, setFirstOption ] = useState( 1 );
  const [ typeOfDate, setTypeOfDate ] = useState( "text" );
  const [ selectedOption, setSelectedOption ] = useState( "true" );

  const onSubmit = (data) => {
    console.log(data);
    setMessageSent( 1 );
    setTimeout( () => {
      setMessageSent( 0 );
      reset();
      setFirstOption( 1 );
      setTypeOfDate( "text" );
      setSelectedOption( "true" );
    }, 3000 );
  };

  const onError = (errors, e) => console.log( errors, e );

  const handleFocus = () => {
    setTypeOfDate( "date" );
  };

  const handleChangeSelect = (e) => {
    setValue( "select", e.target.value, { shouldValidate: true } );
    setFirstOption( 0 );
  };

  const handleChangeRadio = (e) => {
    console.log( e.target.value );
    setSelectedOption( e.target.value );
  };


  return (
    <>
      <form action="#" className="form" onSubmit={ handleSubmit( onSubmit, onError ) }>
        <h1 className="form__title">Тестовая форма, сделанная с помощью <br/>react-hook-form и yup</h1>
        <h2 className="form__subtitle">Анкета посетителя ресторана</h2>
        <fieldset className="form__fieldset">
          <legend className="form__legend">Контактная информация</legend>
          { formFields1.map( (item, index) => {
              switch( item.type ) {
                case( "text" ):
                  return (
                    <TextField item={ item } register={ register( `${ item.name }` ) } errors={ errors[ item.name ] } key={`${item.id}-${index}`}/>
                  );

                case( "email" ):
                  return (
                    <EmailField item={ item } register={ register( `${ item.name }` ) } errors={ errors[ item.name ] } key={`${item.id}-${index}`}/>
                  );

                case( "date" ):
                  return (
                    <DateField item={ item } register={ register( `${ item.name }` ) } errors={ errors[ item.name ] } key={`${item.id}-${index}`}
                               typeOfDate={ typeOfDate } handleFocus={ handleFocus }/>

                  );

                case( "mandatoryCheckbox" ):
                  return (
                    <MandatoryCheckbox item={ item } register={ register( `${ item.name }` ) }
                                       errors={ errors[ item.name ] } key={`${item.id}-${index}`}/>

                  );
                default:
                  return null;
              }
            }
          )
          }
        </fieldset>

        <fieldset className="form__fieldset">
          <legend className="form__legend">Персональная информация</legend>
          {
            formFields2.map( (item, index) => {
              switch( item.type ) {
                case( "number" ):
                  return (
                    <NumberField item={ item } register={ register( `${ item.name }` ) }
                                 errors={ errors[ item.name ] } key={`${item.id}-${index}`}/>
                  );

                case( "select" ):
                  return (
                    <SelectField item={ item } register={ register( `${ item.name }` ) }
                                 errors={ errors[ item.name ] } key={`${item.id}-${index}`} isFirstOption={ isFirstOption }
                                 handleChangeSelect={ handleChangeSelect }/>
                  );


                case( "message" ):
                  return (
                    <MessageField item={ item } register={ register( `${ item.name }` ) }
                                  errors={ errors[ item.name ] } key={`${item.id}-${index}`}/>
                  );

                default:
                  return null;
              }
            } )
          }
        </fieldset>

        <fieldset className="form__fieldset">
          <legend className="form__legend">Оценка нашего заведения</legend>
          <p className="form__question">Почему Вы выбрали наше заведение?</p>
          {
            formFields3.map(  (item, index) => {

              return (
                <CheckboxField item={ item } register={ register( `${ item.name }` ) } key={`${item.id}-${index}`}
                />
              );
            } )
          }

          <p className="form__question">Вы будете рекомендовать наше заведение своим знакомым?</p>
          {
            formFields4.map(  (item, index) => {
              return (
                <RadioField item={ item } register={ register( `${ item.name }` ) }  key={`${item.id}-${index}`} selectedOption={ selectedOption }
                            handleChangeRadio={ handleChangeRadio }/>
              );
            } )
          }
        </fieldset>

        { isMessageSent ? <p className="form__success">Ваше сообщение отправлено</p> : null }

        <button type="submit" className="form__btn">Отправить</button>
      </form>

    </>
  );
}

export default Form;