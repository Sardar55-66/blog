import React, { useState } from 'react';

import './Delete-article.scss';
import '../Article/Article.scss';

import Markdown from 'react-markdown';
import avatar from '../../img/avatar.png';
import heart from '../../img/heart.png';
import BasicModal from '../Modals/Delete-article-modal';

export function DeleteArticle() {
  const [modal, setModal] = useState(false);

  const onClose = () => setModal(false);
  const onOpen = () => setModal(true);

  return (
    <div className="delete-article">
      <div className="article article_fs full-article">
        <div className="article__header">
          <div className="article__title">
            Some article title
            <span className="article__likes">
              <img className="heart" src={heart} alt="heart" />
              <span className="like-counter">12</span>
            </span>
          </div>
          <div className="article__author">
            <span className="author_name">John Doh</span>
            <span className="author__avatar">
              <img className="avatar-image" src={avatar} alt="avatar" />
            </span>
            <span className="article_date">01 january 2020</span>
          </div>
        </div>
        <div className="article__tag">tag</div>
        <div className="article__tag">some tag</div>
        <span className="article__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris  nisi ut aliquip ex ea commodo consequat.
        </span>

        <button className="delete-article__btn" onClick={onOpen}>Delete</button>
        {modal ? <BasicModal open={modal} onClose={onClose} /> : null}

        <div className="article-main-text" />
      </div>
    </div>
  );
}
