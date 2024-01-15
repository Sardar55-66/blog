import axios from 'axios';
import {
  addLoginData, addNewUser, articlesAddAction,
  changePage, createdArticleData, editeProfiledata,
  editedArticleData, getCurrentArticle, isLoaded,
  noLoad, renewPage,
} from '../Actions/Actions';

const url = 'https://blog.kata.academy/api';

export const getArticles = () => async (dispatch) => {
  const data = await axios.get('https:/blog.kata.academy/api/articles');
  dispatch(articlesAddAction(data.data.articles.slice(0, 5)));
  dispatch(isLoaded());
};

export const nextPage = () => async (dispatch) => {
  dispatch(noLoad());

  const data = await axios.get('https://blog.kata.academy/api/articles');
  const { articles } = data.data;
  setTimeout(() => {
    dispatch(isLoaded());
    dispatch(changePage(articles));
  }, 1000);
};

export const refreshArticles = () => async (dispatch) => {
  dispatch(noLoad());
  const data = await fetch('https://blog.kata.academy/api/articles');
  const data2 = await data.json();
  const { articles } = data2;
  setTimeout(() => {
    dispatch(isLoaded());
    dispatch(renewPage(articles));
  }, 1000);
  dispatch(noLoad());
};

export const getArticle = (slug) => async (dispatch) => {
  dispatch(noLoad());
  const data = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
  const article = await data.json();
  setTimeout(() => {
    dispatch(getCurrentArticle(article));
    dispatch(isLoaded());
  }, 1000);
};

export const registerUser = (data) => {
  const { name, mail, pass } = data;

  return async (dispatch) => {
    dispatch(noLoad());
    try {
      const user = {
        username: name,
        email: mail,
        password: pass,
      };
      const data1 = await fetch('https:///blog.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
        }),
      });

      const userData = await data1.json();

      if (userData.user) {
        localStorage.clear();
        localStorage.setItem('token', JSON.stringify(userData.user.token));

        dispatch(addNewUser(userData));
        dispatch(isLoaded());
      } else if (userData.errors) {
        return userData.errors;
      }
    } catch (error) {
      return new Error();
    }
  };
};

export const getLoggendInUser = () => async (dispatch) => {
  dispatch(noLoad());
  const token = JSON.parse(localStorage.getItem('token'));

  const res = await fetch('https:///blog.kata.academy/api/user', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  const userDetails = await res.json();
  dispatch(addLoginData(userDetails));
  dispatch(isLoaded());
};

export const editedProfile = (data) => {
  const {
    editedName, editedMail, editedPass, editedAvatarImage,
  } = data;
  return async (dispatch) => {
    dispatch(noLoad());

    const token = JSON.parse(localStorage.getItem('token'));

    const editedUser = {
      email: editedMail,
      username: editedName,
      password: editedPass,
      bio: 'I work at State Farm',
      image: editedAvatarImage,
    };

    const user = JSON.stringify(editedUser);

    if (token) {
      const response = await axios.put(
        `${url}/user`,
        {
          user,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      if (response.status === 200) {
        dispatch(getLoggendInUser());
        dispatch(editeProfiledata(response.data.user));
        dispatch(isLoaded());
      }
      return response.data;
    } return new Error('Unathorized');
  };
};

export const createArticleApi = (data, tags) => {
  const { title, description, text } = data;

  return async (dispatch) => {
    dispatch(noLoad());
    const token = JSON.parse(localStorage.getItem('token'));

    const articleData = {
      title,
      description,
      body: text,
      tagList: [...tags],
    };

    const res = await axios.post(
      `${url}/articles`,
      {
        article: articleData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },

    );
    dispatch(createdArticleData(res.data));
    dispatch(isLoaded());
  };
};

export const deleteArticleApi = (slug) => async (dispatch) => {
  dispatch(noLoad());
  const token = JSON.parse(localStorage.getItem('token'));

  const result = await axios.delete(
    `${url}/articles/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },

  );
  dispatch(isLoaded());

  return result;
};

export const editArticleApi = (data, slug) => {
  const { editedTitle, editedDescription, editedText } = data;

  return async (dispatch) => {
    dispatch(noLoad());
    const token = JSON.parse(localStorage.getItem('token'));

    const articleData = {
      title: editedTitle,
      description: editedDescription,
      body: editedText,
    };

    const res = await axios.put(
      `${url}/articles/${slug}`,
      {
        article: articleData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },

    );
    dispatch(isLoaded());
    dispatch(editedArticleData(res.data));
  };
};