import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { addArticleSlug, addArticles, addCurrentArticle, addPage, createUser, loggingIn, loginStatusCheck, nextPage, randomAvatar, registeringError, signUp } from './components/Reducers/Reducers';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';



const store = configureStore({
  reducer: {
    articles: addArticles,
    article: addCurrentArticle,
    slug: addArticleSlug,
    page: addPage,
    avatar: randomAvatar,
    users: createUser,
    login: loggingIn,
    error: registeringError
    }
}, applyMiddleware(thunk))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

