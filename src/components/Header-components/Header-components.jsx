import React, { useEffect } from 'react';
import './Header-components.scss';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggendInUser } from '../api/get-api-data';
import avatar from '../../img/Bear-Avatar-icon.png';

export function HeaderLogo() {
  return (
    <div className="header__logo">
      <h2 className="header__logo_link"><Link to="/">Realworld Blog</Link></h2>
    </div>
  );
}

export function CreateArticleBtn() {
  const authSignIn = useSelector((state) => state.login.auth);

  return (
    <Link className="create-article-btn" to={!authSignIn ? '/signin' : '/authorized-list/new-article'}>
      Create Article
    </Link>
  );
}

export function HeaderUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.loginData);
  const editedUser = useSelector((state) => state.edit.editedData);
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => { dispatch(getLoggendInUser()); }, []);
  useEffect(() => { dispatch(getLoggendInUser()); }, [token]);

  return (
    <div className="header__user">
      <span className="username">{editedUser?.username ? editedUser?.username : user?.user.username}</span>
      <Link to="/authorized-list/profile"><img id="avatars" src={avatar} alt="avatar" /></Link>
    </div>
  );
}

export function Login() {
  return (
    <button className="login">
      Log In
    </button>
  );
}

export function LogOut() {
  return (
    <button className="logout">
      <Link to="/" className="link-logout">Log Out</Link>
    </button>
  );
}

export function SignIn() {
  return (
    <button className="signin">
      <NavLink to="/signin">Sign In</NavLink>
    </button>
  );
}

export function SignUp() {
  return (
    <button className="signup">
      <NavLink to="/signup">Sign UP</NavLink>
    </button>
  );
}