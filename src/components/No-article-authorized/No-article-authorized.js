import React from "react";
import './No-article-authorized.scss'




export const NoArticleAuthorized = () => {

    return <div className="noarticle">
        <div className="noarticle__tet">
            Sorry, no article found... go back to <a className="home" href="/authorized-list">first page</a>
        </div>
    </div>
}