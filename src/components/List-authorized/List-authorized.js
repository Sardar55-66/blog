import React from "react";
import './List-authorized.scss';
import avatar from '../../img/avatar.png';
import heart from '../../img/heart.png';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getArticleSlug, getCurrentArticle } from "../Actions/Actions";
import { getArticle } from "../api/get-api-data";



export const AuthorizedList = (props) => {

    const dispatch = useDispatch()

    const article = props.data
    const {author} = article
    const slug = useSelector(state => state.slug.slug)
    

    return (
        <div className="article article_fs">
            <div className="article__header">
                <div className="article__title">
                <Link className="title-link" onClick={() => dispatch(getArticle(article.slug))} to={`/articles/${article.slug}`}>{article.title}</Link>
                    <span className="article__likes">
                        <img className="heart"src={heart} alt="heart"/>
                        <span className="like-counter">{article.favoritesCount}</span>
                    </span>
                </div>
                <div className="article__author">
                    <span className="author_name">{author.username}</span>
                    <span className="author__avatar">
                        <img className="avatar-image" src={author.image} alt="avatar"/>
                    </span>
                    <span className="article_date">{article.createdAt}</span>
                </div>
            </div>
            <div className="article__tag">{article.tagList.length !== 0 ? article.tagList: 'some tag'}</div>
            <div className="article__tag">some tag</div>
            <span className="article__text">{article.description}</span>
        </div>
    )
}