/* eslint-disable */
import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './Create-article.scss';

import { useNavigate } from 'react-router-dom';
import { createArticleApi, editArticleApi } from '../api/get-api-data';

export function CreateArticle() {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const articles = useSelector((state) => state.create.userArticle);
  const slug = articles?.article.slug;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    clearErrors,
  } = useForm({
    criteriaMode: 'onBlur',
  });

  const tagValue = document.querySelector('.tag-value');
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (isValid) {
      dispatch(createArticleApi(data, tags));
    }
    return navigate('/authorized-list/articles/{slug}');
  };

  return (
    <div className="create-article">
      <h2 className="edit-article-title">Create new article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className="title_text">Title</span>
          <input
            {...register('title', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 3,
                message: 'Символов должно быть не меньше 3!',
              },
              maxLength: {
                value: 10,
                message: 'Символов должно быть не больше 10!',
              },
            })}
            className="title"
            type="text"
          />
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.title && <p>{errors.title.message}</p>}</div>

        <label>
          <span className="description_text">Short description</span>
          <input
            {...register('description', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 5,
                message: 'Символов должно быть не меньше 5!',
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
        <div style={{ height: 40, color: 'red' }}>{errors?.description && <p>{errors.description.message}</p>}</div>

        <label>
          <span className="text_text">Text</span>
          <input
            {...register('text', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 5,
                message: 'Символов должно быть не меньше 5!',
              },
              maxLength: {
                value: 30,
                message: 'Символов должно быть не больше 30!',
              },
            })}
            className="text"
            type="text"
          />
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.text && <p>{errors.text.message}</p>}</div>

        <label className="tags-form">
          <span className="tags_text">Tags</span>

          {tags.map((tag, index) => (
            <li key={index} className="tags-list">
              <div className="tags-second-container">
                <input className="tags" value={tag} disabled />
                <button
                  onClick={() => {
                    const id = tags.indexOf(tag);
                    setTags([...tags.slice(0, id), ...tags.slice(id + 1)]);
                  }}
                  type="button"
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}

          <div className="tags-first-container">
            <input {...register('tagsData')} className="tags tag-value hiden-input not-active" type="text" />
            <button
              onClick={() => {
                const inpuField = document.querySelector('.hiden-input');
                const hidenDeleteBtn = document.querySelector('.hiden-btn');

                if (!inpuField.classList.contains('not-active') && !hidenDeleteBtn.classList.contains('not-active') && tagValue?.value) {
                  setTags([...tags, tagValue.value]);
                  tagValue.value = '';
                }

                inpuField.classList.remove('not-active');
                hidenDeleteBtn.classList.remove('not-active');
              }}
              type="button"
              className="add-btn hidde-addtag-btn"
            >
              Add tag
            </button>
            <button
              type="button"
              onClick={() => {
                const inpuField = document.querySelector('.hiden-input');
                const hidenDeleteBtn = document.querySelector('.hiden-btn');

                inpuField.classList.add('not-active');
                hidenDeleteBtn.classList.add('not-active');

                return clearErrors('tagsData');
              }}
              className="delete-btn hiden-btn not-active"
            >
              Delete
            </button>
          </div>
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.tag && <p>{errors.tag.message}</p>}</div>

        <input type="submit" className="send-btn" value="Send" />
      </form>
    </div>
  );
}

export function EditArticle() {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const articles = useSelector((state) => state.create.userArticle);
  const editedArticle = useSelector((state) => state.editA.edited);
  const slug = articles?.article.slug;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    clearErrors,
    control,
  } = useForm({
    criteriaMode: 'onBlur',
  });

  const tagValue = document.querySelector('.tag-value');
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    if (isValid) {
      dispatch(editArticleApi(data, slug));
    }

    return navigate('/authorized-list/articles/{slug}/edited');
  };

  return (

    <div className="create-article">
      <h2 className="edit-article-title">Edit article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className="title_text">Title</span>
          <input
            {...register('editedTitle', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 3,
                message: 'Символов должно быть не меньше 3!',
              },
              maxLength: {
                value: 10,
                message: 'Символов должно быть не больше 10!',
              },
            })}
            className="title"
            type="text"
          />
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.title && <p>{errors.title.message}</p>}</div>

        <label>
          <span className="description_text">Short description</span>
          <input
            {...register('editedDescription', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 5,
                message: 'Символов должно быть не меньше 5!',
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
        <div style={{ height: 40, color: 'red' }}>{errors?.description && <p>{errors.description.message}</p>}</div>

        <label>
          <span className="text_text">Text</span>
          <input
            {...register('editText', {
              required: 'Поле обязательно к заполнению!',
              minLength: {
                value: 5,
                message: 'Символов должно быть не меньше 5!',
              },
              maxLength: {
                value: 30,
                message: 'Символов должно быть не больше 30!',
              },
            })}
            className="text"
            type="text"
          />
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.text && <p>{errors.text.message}</p>}</div>

        <label className="tags-form">
          <span className="tags_text">Tags</span>

          {tags.map((tag, index) => (
            <li key={index} className="tags-list">
              <div className="tags-second-container">
                <input className="tags" value={tag} disabled />
                <button
                  onClick={() => {
                    const id = tags.indexOf(tag);
                    setTags([...tags.slice(0, id), ...tags.slice(id + 1)]);
                  }}
                  type="button"
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}

          <div className="tags-first-container">
            <input {...register('editedTagsData')} className="tags tag-value hiden-input not-active" type="text" />
            <button
              onClick={() => {
                const inpuField = document.querySelector('.hiden-input');
                const hidenDeleteBtn = document.querySelector('.hiden-btn');

                if (!inpuField.classList.contains('not-active') && !hidenDeleteBtn.classList.contains('not-active') && tagValue?.value) {
                  setTags([...tags, tagValue.value]);
                  tagValue.value = '';
                }

                inpuField.classList.remove('not-active');
                hidenDeleteBtn.classList.remove('not-active');
              }}
              type="button"
              className="add-btn hidde-addtag-btn"
            >
              Add tag
            </button>
            <button
              type="button"
              onClick={() => {
                const inpuField = document.querySelector('.hiden-input');
                const hidenDeleteBtn = document.querySelector('.hiden-btn');

                inpuField.classList.add('not-active');
                hidenDeleteBtn.classList.add('not-active');

                return clearErrors('editedTagsData');
              }}
              className="delete-btn hiden-btn not-active"
            >
              Delete
            </button>
          </div>
        </label>
        <div style={{ height: 40, color: 'red' }}>{errors?.tag && <p>{errors.tag.message}</p>}</div>

        <input type="submit" className="send-btn" value="Send" />
      </form>
    </div>

  );
}
