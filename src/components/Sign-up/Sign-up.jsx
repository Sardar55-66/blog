import React from 'react';
import './Sign-up.scss';
import {
  Link,  useNavigate,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
   getArticles, registerUser,
} from '../api/get-api-data';


export function SignUpForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setError,
    watch,
    clearErrors,
    setValue,
  } = useForm({
    criteriaMode: 'onBlur',
  });

  const dispatch = useDispatch();
  const firstPass = watch('pass');
  const navigate = useNavigate();
  const errorMsg = useSelector((state) => state.error.errorMeassage);

  const onSubmit = (data) => {
    if (isValid) {
      navigate('/authorized-list');
      dispatch(getArticles());
      dispatch(registerUser(data));
    } else {
      return errorMsg;
    }

    reset();
  };

  return (
    <div className=" create-article edit-profile signup-form">
      <h2 className="edit-article-title">Create new account</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* поле юзернейм */}
        <label>
          <span className="description_text">Username</span>
          <input
            {...register('name', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 3,
                message: 'Символов должно быть не меньше 3!',
              },
              maxLength: {
                value: 20,
                message: 'Символов должно быть не больше 20!',
              },
            })}
            className="description"
            type="text"
          />
        </label>
        <div style={{ height: 40 }}>{errors?.name && <p style={{ margin: 0, color: 'red' }}>{errors.name.message}</p>}</div>

        {/* поле емаил */}
        <label>
          <span className="description_text">Email Address</span>
          <input
            {...register('mail', {
              required: 'Поле обязательно к заполнению!',
              pattern: {
                value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/g,
                message: 'Почта введена неккоректно',
              },
            })}
            className="description"
            type="text"
          />
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.mail && <p>{errors.mail.message}</p>}</div>

        {/* поле пароля */}
        <label>
          <span className="text_text">Password</span>
          <input
            {...register('pass', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 2,
                message: 'Символов должно быть не меньше 6!',
              },
              maxLength: {
                value: 40,
                message: 'Символов должно быть не больше 40!',
              },
            })}
            className="text"
            type="password"
          />
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.pass && errors?.pass?.message && <p style={{ margin: 0, color: 'red' }}>{errors.pass.message}</p>}</div>

        {/* поле повтора пароля */}
        <label>
          <span className="description_text">Repeat Password</span>
          <input
            {...register('repeatedPassword', {
              required: 'Поле обязательно к заполнению!',
              validate: (pass) => pass === firstPass && pass.length === firstPass.length || setError('password', { type: 'manual', message: 'Пароли не совпадают!' }) || clearErrors('password'),
              minLength: {
                value: 2,
                message: 'Символов должно быть не меньше 6!',
              },
              maxLength: {
                value: 40,
                message: 'Символов должно быть не больше 40!',
              },
            })}
            className="description"
            type="password"
          />
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.pass && errors?.pass?.message && <p style={{ margin: 0, color: 'red' }}>{errors.pass.message}</p>}</div>

        {/* чекбокс */}
        <label className="signup-checkbox">
          <input
            className="signup-check"
            {...register('checkbox', {
              required: 'Необходимо согласится с условиями обработки персональных данных!',
              validate: (checkbox) => checkbox === true || setError('checkbox', { type: 'checkbox', message: 'Вы не согласились на обработку персональных данны!' }),
            })}
            type="checkbox"
          />
          <span className="description_text signup-text">I agree to the processing of my personal information</span>
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.checkbox && errors?.checkbox?.message && <p style={{ color: 'red' }}>{errors.checkbox.message}</p>}</div>

        <input type="submit" className="send-btn" value="Create" />

        <div className="have-account">
          Already have an account?
          <Link to="/signin">Sign In.</Link>
        </div>
      </form>
    </div>
  );
}
