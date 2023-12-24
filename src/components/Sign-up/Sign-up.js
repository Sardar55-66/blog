import React from "react";
import './Sign-up.scss'
import { Link } from "react-router-dom";




export const SignUpForm = () => {

    return (
        <div className=" create-article edit-profile signup-form">
            <h2 className="edit-article-title">Create new account</h2>
            <form>

            <label>
                <span className="description_text">Username</span>
                <input className="description" type="text"/>
            </label>
    
            <label>
                <span className="description_text">Email Address</span>
                <input className="description" type="text"/>
            </label>

            <label>
                <span className="text_text">Password</span>
                <input className="text" type="text"/>
            </label>

            <label>
                <span className="description_text">Repeat Password</span>
                <input className="description" type="text"/>
            </label>

            <label className="signup-checkbox">
            <input type="checkbox"/>
                <span className="description_text signup-text">I agree to the processing of my personal information</span>
            </label>

            <button className="send-btn">Create</button>

            <div className="have-account">Already have an account? <Link to='/signin'>Sign In.</Link></div>
        </form>
        </div>
    )
}