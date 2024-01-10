/*eslint-disable */
import { React } from 'react';
import './Article.scss';
import '../List/List.scss';

import { useSelector } from 'react-redux';
import heart from '../../img/heart.png';

export const Article = () => {

  const article = useSelector((state) => state.article.article);

  if (article) {
    return article.map((el) => {
      const {
        title, tagList, favoritesCount, author, createdAt, description, body,
      } = el.article;

      return (
        <div className="article article_fs full-article">
          <div className="article__header">
            <div className="article__title">
              {title}
              <span className="article__likes">
                <img className="heart" src={heart} alt="heart" />
                <span className="like-counter">{favoritesCount}</span>
              </span>
            </div>
            <div className="article__author">
              <span className="author_name">{author.username}</span>
              <span className="author__avatar">
                <img className="avatar-image" src={author.image} alt="avatar" />
              </span>
              <span className="article_date">{createdAt}</span>
            </div>
          </div>
          <div className="article__tag full-articles-tag">{tagList}</div>
          <div className="article__tag full-articles-tag">some tag</div>
          <div className="article__descr">
            {description}
          </div>
          <span className="article__text">
            <h2>{description}</h2>
            {description}
          </span>

          <div className="article-main-text">
            <h2>{description}</h2>
            {body}
          </div>
        </div>
      );
    });
  }
};
