// eslint-disable
import { React, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CreateArticle, EditArticle } from '../Create-edit-article/Create-edit-article';
import {
  HeaderLogo, CreateArticleBtn, HeaderUser, LogOut, SignIn, SignUp,
} from '../Header-components/Header-components';
import ListOfArticles from '../List/List';
import { getArticles, nextPage } from '../api/get-api-data';
import './App.scss';

import PaginationControlled from '../Pagination/Pagination';
import CircularWithValueLabel from '../Spinner/Spinner';

import EditProfile from '../Edit-profile/Edit-profile';
import SignInForm from '../Sign-in/Sign-in';
import SignUpForm from '../Sign-up/Sign-up';
import AuthorizedList from '../List-authorized/List-authorized';

import ErrorComponent from '../ErrorComponent/ErrorComponent';
import NoArticle from '../No-article-authorized/No-article';
import ArticleAuthorized from '../Article/Article-authorized';
import EditedArticle from '../Edited-article/Edited-article';
import { Article } from '../Article/Article';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const isLoaded = useSelector((state) => state.addA.isLoaded);
  const articles = useSelector((state) => state.addA.articles);
  const slug = useSelector((state) => state.slug.slug);
  const errorMsg = useSelector((state) => state.error.errorMessage);

  return (

    <div className="App">

      <header className="header">
        <div className="header__logo">
          <Routes>
            <Route path="*" element={<HeaderLogo />} />
          </Routes>
        </div>
        <div className="header__info">
          <Routes>
            <Route
              path="/:signin?"
              element={(
                <>
                  <SignUp />
                  <SignIn />
                </>
            )}
            />

            <Route
              path="/authorized-list/:profile?"
              element={(
                <>
                  <CreateArticleBtn />
                  <HeaderUser />
                  <Link to="/"><LogOut /></Link>
                </>
              )}
            />
            <Route
              path="/authorized-list/articles/{slug}/:edit?"
              element={(
                <>
                  <CreateArticleBtn />
                  <HeaderUser />
                  <Link to="/"><LogOut /></Link>
                </>
              )}
            />
          </Routes>
        </div>
      </header>

      <Routes>
        <Route path="/" element={articles.length === 0 ? <NoArticle /> : null} />
        <Route path="/authorized-list" element={articles.length === 0 ? <NoArticle /> : null} />
        <Route path="/authorized-list/:profile?" element={<EditProfile />} />
        <Route path="/authorized-list/:new-article?" element={<CreateArticle />} />
        <Route
          path="/"
          element={(
            <>
              <CreateArticleBtn />
              <HeaderUser />
              <Link to="/"><LogOut /></Link>
            </>
        )}
        />
        <Route path="/authorized-list/articles/{slug}" element={<ArticleAuthorized />} />
        <Route path="/authorized-list/articles/{slug}/edit" element={<EditArticle />} />
        <Route path="/authorized-list/articles/{slug}/edited" element={<EditedArticle />} />
      </Routes>

      {!isLoaded ? <CircularWithValueLabel /> : articles.map((article) => (
        <Routes>
          <Route
            path="/"
            element={(
              <>
                <ListOfArticles key={article.slug} data={article} />
                <PaginationControlled />

              </>
    )}
          />
          <Route
            path="/authorized-list"
            element={(
              <>
                <AuthorizedList data={article} />
                <PaginationControlled />
              </>
    )}
          />

        </Routes>
      ))}
      <Routes>

        <Route
          path="/signup"
          element={(
            <>
              <SignUpForm />
              <Link className="main-page-redirect" to="/"><span className="main-page">back</span></Link>
            </>
  )}
        />
        <Route
          path="/signin"
          element={(
            <>
              <SignInForm />
              <Link className="main-page-redirect" to="/"><span className="main-page">back</span></Link>
            </>
  )}
        />

        <Route
          path="/articles/:slug?"
          element={(
            <>
              {isLoaded ? null : <CircularWithValueLabel />}
              <Article slug={slug} />
              <Link className="main-page-redirect" to="/"><span className="main-page">back</span></Link>
            </>
)}
        />
        <Route path="/error" element={<ErrorComponent error={errorMsg} />} />
      </Routes>
    </div>

  );
}

export default App;