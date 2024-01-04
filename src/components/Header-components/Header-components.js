import React, { useEffect } from "react";
import './Header-components.scss'
//import avatar from '../../img/avatar.png'
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoggendInUser, getRandomAvatar } from "../api/get-api-data";
import avatar from '../../img/Bear-Avatar-icon.png'


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
    const dispatch = useDispatch()
    const user = useSelector(state => state.login.loginData)
    //const avatar = useSelector(state => state.avatar.url)
    const token = JSON.parse(localStorage.getItem('token'))
    

    useEffect(() => {dispatch(getLoggendInUser())}, [])
    useEffect(() => {dispatch(getLoggendInUser())}, [token])


    const email = JSON.parse(localStorage.getItem('email'))
    const datas = JSON.parse(localStorage.getItem(JSON.stringify(email)))
    const img = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconarchive.com%2Fshow%2Fincognito-animals-icons-by-iconarchive%2FBear-Avatar-icon.html&psig=AOvVaw0K_qN2RbxyywTOxX6VyfSF&ust=1704377150056000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCIigtOyxwYMDFQAAAAAdAAAAABAI'
    
    
   return <div className="header__user">
        <span className="username">{user?.user.username}</span>
        <Link to ="/profile"><img id='avatars' src={avatar} alt="avatar"/></Link>
    </div>
}

export const Login = () => {
    return <button className="login">
        Log In
    </button>
}

export const LogOut = () => {
    return <button className="logout">
        <Link to='/' className="link-logout">Log Out</Link>
    </button>
}

export const SignIn = () => {
    return <button className="signin">
        <NavLink to="/signin">Sign In</NavLink>
    </button>
}

export const SignUp = () => {
    return <button className="signup">
        <NavLink to="/signup">Sign UP</NavLink>
    </button>
}