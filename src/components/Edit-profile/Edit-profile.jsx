import React from 'react';
import './Edit-profile.scss';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { editedProfile } from '../api/get-api-data';

export function EditProfile() {
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    criteriaMode: 'onBlur',
  });

  const onSubmit = (data) => {
    if (isValid) {
      dispatch(editedProfile(data));
    }
  };

  return (
    <div className=" create-article edit-profile">
      <h2 className="edit-article-title">Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className="title_text">Username</span>
          <input
            {...register('editedName', {
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
            className="title"
            type="text"
          />
        </label>
        <div style={{ height: 40 }}>{errors?.editedName && <p style={{ margin: 0, color: 'red' }}>{errors.editedName.message}</p>}</div>

        <label>
          <span className="description_text">Email Address</span>
          <input
            {...register('editedMail', {
              required: 'Поле обязательно к заполнению!',
              pattern: {
                value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/g,
                message: 'Почта введена неккоректно',
              },
            })}
            className="description"
            type="email"
          />
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.editedMail && errors?.editedMail?.message && <p style={{ margin: 0, color: 'red' }}>{errors.editedMail.message}</p>}</div>

        <label>
          <span className="text_text">New Password</span>
          <input
            {...register('editedPass', {
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
        <div style={{ height: 40, color: 'red' }}>{errors?.editedPass && errors?.editedPass?.message && <p style={{ margin: 0, color: 'red' }}>{errors.editedPass.message}</p>}</div>

        <label>
          <span className="text_text">Avatar Image (url)</span>
          <input {...register('editedAvatarImage')} className="text" type="url" />
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.pass && errors?.pass?.message && <p style={{ margin: 0, color: 'red' }}>{errors.pass.message}</p>}</div>

        <input type="submit" className="send-btn" value="Save" />
      </form>
    </div>
  );
}
