import React from "react";
import './No-article-error.scss'




export const NoArticle = () => {

    return <div className="noarticle">
        <div className="noarticle__tet">
            Sorry, no article found... go back to <a className="home" href="/">first page</a>
        </div>
    </div>
}