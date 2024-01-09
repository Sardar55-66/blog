import React from "react";
import './No-article-authorized.scss'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";




export const NoArticle = () => {

    const auth1 = useSelector(state => state.login.auth)
    const auth2 = useSelector(state => state.users.auth)

    if (auth1 || auth2) {
        return <div className="noarticle">
        <div className="noarticle__tet">
            Sorry, no article found... go back to <Link className="home" to='/authorized-list/' >first page</Link>
        </div>
    </div>
    } else {
        return <div className="noarticle">
        <div className="noarticle__tet">
            <button>Sorry, no article found... go back to <Link className="home" to='/' >first page</Link></button>
        </div>
    </div>
    }
}