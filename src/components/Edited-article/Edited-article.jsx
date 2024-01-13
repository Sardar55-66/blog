import React, { useState } from 'react';
import './Edited-article.scss';

import '../List/List.scss';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import heart from '../../img/heart.png';
import BasicModal from '../Modals/Delete-article-modal';

function EditedArticle() {
  const editedArticleData = useSelector((state) => state.editA.edited);
  const auth = useSelector((state) => state.login.auth);

  const [likeCount, setLikeCount] = useState(editedArticleData.article.favoritesCount);
  const [modal, setModal] = useState(false);

  const onClose = () => setModal(false);
  const onOpen = () => setModal(true);

  const addLikes = () => {
    if (auth) {
      return setLikeCount((l) => l + 1);
    }
    return auth;
  };

  if (editedArticleData) {
    const { article } = editedArticleData;

    return (
      <div className="article article_fs full-article">
        <div className="article__header">
          <div className="article__title">
            {article.title}
            <span className="article__likes">
              <img onClick={addLikes} className="heart" src={heart} alt="heart" />
              <span className="like-counter">{likeCount}</span>
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
        {article.tagList.map((tag, id) => <div key={id} className="article__tag full-articles-tag">{tag}</div>)}
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

export default EditedArticle;