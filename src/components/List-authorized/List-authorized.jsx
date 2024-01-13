// eslint-disable
import React, { useState } from 'react';
import './List-authorized.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import heart from '../../img/heart.png';
import { getArticle } from '../api/get-api-data';
import redHeart from '../../img/heart-red.png';

function AuthorizedList(props) {
  const article = props.data;
  const ix = props.id;
  const dispatch = useDispatch();
  const auth1 = useSelector((state) => state.login.auth);
  const auth2 = useSelector((state) => state.users.auth);

  const [likesCount, setLikesCount] = useState(0);
  const [fn, setFn] = useState(false);

  function addLikes() {
    const heartIcon = Array.from(document.querySelectorAll('.heart'));
    if (auth1 || auth2 && likesCount) {
      setLikesCount((l) => l + 1);
      heartIcon[ix].src = redHeart;
      setFn(true);
      setTimeout(() => { heartIcon[ix].src = heart; }, 250);
    }
  }
  const { author } = article;

  return (
    <div className="article article_fs">
      <div className="article__header">
        <div className="article__title">
          <Link className="title-link" onClick={() => { dispatch(getArticle(article.slug)); }} to={`/articles/${article.slug}`}>{article.title}</Link>
          <span className="article__likes">
            <img className="heart" src={heart} onClick={!fn ? addLikes : null} alt="heart" />
            <span className="like-counter">{likesCount}</span>
          </span>
        </div>
        <div className="article__author">
          <span className="author_name">{author.username}</span>
          <span className="author__avatar">
            <img className="avatar-image" src={author.image} alt="avatar" />
          </span>
          <span className="article_date">{article.createdAt}</span>
        </div>
      </div>
      <div className="article__tag">{article.tagList.length !== 0 ? article.tagList : 'some tag'}</div>
      <div className="article__tag">some tag</div>
      <span className="article__text">{article.description}</span>
    </div>
  );
}

export default AuthorizedList;