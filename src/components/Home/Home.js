import React, { useEffect } from "react";

import './Home.scss'
import { useDispatch } from "react-redux";
import { getArticles, nextPage, refreshArticles } from "../api/get-api-data";


export const Home = () => {

    const dispatch = useDispatch()

    return <div 
    className="home"
    onClick={() => dispatch(refreshArticles())}
    >Home</div>
}