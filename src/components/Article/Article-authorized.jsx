/*eslint-disable */
import { React, useState } from 'react';
import './Article.scss';
import '../List/List.scss';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import heart from '../../img/heart.png';
import redHeart from '../../img/heart-red.png';
import BasicModal from '../Modals/Delete-article-modal';

function ArticleAuthorized() {
  const articleData = useSelector((state) => state.create.userArticle);

  const auth1 = useSelector((state) => state.login.auth);
  const auth2 = useSelector((state) => state.users.auth);

  const [modal, setModal] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [fn, setFn] = useState(false);

  const onClose = () => setModal(false);
  const onOpen = () => setModal(true);

  const addLikes = () => {
    const heartIcon = document.querySelector('.heart');

    if (auth1 || auth2 && likesCount) {
      setLikesCount((l) => l + 1);

      heartIcon.src = redHeart;
      setFn(true);
      setTimeout(() => heartIcon.src = heart, 250);
    }
  };

  if (articleData) {
    const { article } = articleData;

    return (
      <div className="article article_fs full-article">
        <div className="article__header">
          <div className="article__title">
            {article.title}
            <span className="article__likes">
              <img onClick={!fn ? addLikes : null} className="heart" src={heart} alt="heart" />
              <span className="like-counter">{likesCount}</span>
            </span>
          </div>
          <div className="article__author">
            <span className="author_name">{article.author.username}</span>
            <span className="author__avatar">
              <img className="avatar-image" src={article.author.image} alt="avatar" />
            </span>
            <span className="article_date">{article.createdAt.slice(0, 10)}</span>
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={onOpen} className="delete-btn">Delete</button>
          {modal ? <BasicModal open={modal} onClose={onClose} /> : null}
          <Link to="/authorized-list/articles/{slug}/edit" type="button" className="add-btn">Edit</Link>
        </div>
        {article.tagList.map((tag, id) => {
          <div key={id} className="article__tag full-articles-tag">{tag}</div>;
        })}
        <div className="article__descr">
          {article.description}
        </div>
        <span className="article__text">
          <h2>{article.description}</h2>
          {article.description}
        </span>

        <div className="article-main-text">
          <h2>{article.description}</h2>
          {article.body}
        </div>
      </div>
    );
  }
}

export default ArticleAuthorized;
