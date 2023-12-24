import React from "react";
import './Header-components.scss'
import avatar from '../../img/avatar.png'
import { Link } from "react-router-dom";


export const HeaderLogo = () => {

    return <div className="header__logo">
        <h2 className="header__logo_link"><Link to="/">Realworld Blog</Link></h2>
    </div>
}

export const CreateArticleBtn = () => {
    return <button className="create-article-btn">
        Create Article
    </button>
}

export const HeaderUser = () => {
   return <div className="header__user">
        <span className="username">John Doe</span>
        <img src={avatar} alt="avatar"/>
    </div>
}

export const Login = () => {
    return <button className="login">
        Log In
    </button>
}

export const LogOut = () => {
    return <button className="logout">
        Log Out
    </button>
}

export const SignIn = () => {
    return <button className="signin">
        <Link to="/signin">Sign In</Link>
    </button>
}

export const SignUp = () => {
    return <button className="signup">
        <Link to="/signup">Sign UP</Link>
    </button>
}