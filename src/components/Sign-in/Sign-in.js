import React from "react";
import './Sign-in.scss'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getArticles, getLoggendInUser, getRandomAvatar, login, refreshArticles, registerUser } from "../api/get-api-data";
import { loggingIn } from "../Reducers/Reducers";
import { addLoginData, addNewUser, articlesAddAction } from "../Actions/Actions";






export const SignInForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const {
        register,
        formState : { errors, isValid },
        handleSubmit,
        reset,
        setError,
        watch,
        clearErrors
    } = useForm({
        criteriaMode: 'onBlur'
    })


    const onSubmit = async (data) => {
        
        // dispatch(login(data))

        

        const { emailLogin, passwordLogin } = data

    

        const user = {
            email: emailLogin,
            password: passwordLogin
        }; 

        const res = await fetch('https:///blog.kata.academy/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user,
            })
        });

        

        if (!res.ok) {
            setError('emailLogin', {type: 'manual', message: 'Почта или пароль указаы неверно!'})
            setError('passwordLogin', {type: 'manual', message: 'Почта или пароль указаны неверно!'})
        } else {
            clearErrors('emailLogin')
            clearErrors('passwordLogin')
        }
        
        if (res.ok && isValid) {
            dispatch(addNewUser(data))
    
            localStorage.setItem('email', JSON.stringify(emailLogin))
            
            setTimeout(() => {
                navigate('/authorized-list')
                dispatch(getArticles())
                dispatch(refreshArticles())
           }, 1000);
           
        }   
        
    }


    return (

        <div className=" create-article edit-profile">
            <h2 className="edit-article-title">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
    
            <label>
                <span className="description_text">Email Address</span>
                <input {...register('emailLogin', {
                            required: 'Поле обязательно к заполнению!',
                                pattern: {
                                    value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/g,
                                    message: 'Почта введена неккоректно'
                                        }
                        })} className="description" type="text"/>
            </label>
            <div style={{height: 40, color: 'red'}}>{errors?.emailLogin && <p>{errors.emailLogin.message}</p>}</div> 


            <label>
                <span className="text_text">Password</span>
                <input {...register('passwordLogin', {
                    required: 'Поле обязательно к заполнению!',
                    minLength: {
                        value: 2,
                        message: 'Символов должно быть не меньше 6!'
                    }
                })} className="text" type="password"/>
            </label>
            <div style={{height: 40, color: 'red'}}>{errors?.passwordLogin && <p>{errors.passwordLogin.message}</p>}</div> 

            <button className="send-btn">Login</button>

            <div className="have-account">Don’t have an account? <Link to='/signup'>Sign Up.</Link></div>
        </form>
        </div>
    )
}