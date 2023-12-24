import React from "react";
import './Sign-in.scss'
import { Link } from "react-router-dom";




export const SignInForm = () => {

    return (
        <div className=" create-article edit-profile">
            <h2 className="edit-article-title">Sign In</h2>
            <form>
    
            <label>
                <span className="description_text">Email Address</span>
                <input className="description" type="text"/>
            </label>

            <label>
                <span className="text_text">Password</span>
                <input className="text" type="text"/>
            </label>

            <button className="send-btn">Login</button>

            <div className="have-account">Don’t have an account? <Link to='/signup'>Sign Up.</Link></div>
        </form>
        </div>
    )
}