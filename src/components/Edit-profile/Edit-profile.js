import React from "react";
import './Edit-profile.scss'




export const EditProfile = () => {

    return (
        <div className=" create-article edit-profile">
            <h2 className="edit-article-title">Edit Profile</h2>
            <form>
            <label>
                <span className="title_text">Username</span>
                <input className="title" type="text"/>
            </label>

            <label>
                <span className="description_text">Email Address</span>
                <input className="description" type="text"/>
            </label>

            <label>
                <span className="text_text">New Password</span>
                <input className="text" type="text"/>
            </label>

            <label>
                <span className="text_text">Avatar Image (url)</span>
                <input className="text" type="text"/>
            </label>

            <button className="send-btn">Save</button>
        </form>
        </div>
    )
}