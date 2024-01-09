import React from "react";
import './Edit-article.scss'

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createArticleApi } from "../api/get-api-data";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";



    


export const EditArticle = () => {

    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    const articles = useSelector(state => state.create.userArticle)
    const slug = articles?.article.slug

    
    

    const {
        register,
        formState : { errors, isValid },
        handleSubmit,
        reset,
        setError,
        watch,
        resetField,
        clearErrors,
        control
    } = useForm({
        criteriaMode: 'onBlur',
    })
    
    const tagValue = document.querySelector('.tag-value')
    const dispatch = useDispatch()   

    


    const onSubmit = (data) => {
        if (isValid ) {
            dispatch(createArticleApi(data, tags))

        }
        
            return navigate('/authorized-list/articles/{slug}')
        
        
    }

    return (
        <div className="create-article edit-article">
            <h2 className="edit-article-title">Edit Article</h2>
            <form>
            <label>
                <span className="title_text">Title</span>
                <input className="title" type="text"/>
            </label>

            <label>
                <span className="description_text">Short description</span>
                <input className="description" type="text"/>
            </label>

            <label>
                <span className="text_text">Text</span>
                <input className="text" type="text"/>
            </label>

            <label className="tags-form">
            <span className="tags_text">Tags</span>
            <div className="tags-first-container">
                <input {...register('tagsData')} className="tags tag-value hiden-input not-active" type="text" /> 
                <button onClick={() => {
                    const inpuField = document.querySelector('.hiden-input')
                    const hidenDeleteBtn = document.querySelector('.hiden-btn')
                    
                    

                        if (!inpuField.classList.contains('not-active') && !hidenDeleteBtn.classList.contains('not-active') && tagValue?.value) {
                            setTags([...tags, tagValue.value])
                            tagValue.value = ''
                        }

                        
                        
                    inpuField.classList.remove('not-active')
                    hidenDeleteBtn.classList.remove('not-active')
                    }} type="button" className="add-btn hidde-addtag-btn">Add tag</button>
                <button type="button" onClick={() => {
                    const inpuField = document.querySelector('.hiden-input')
                    const hidenDeleteBtn = document.querySelector('.hiden-btn')
                    
                    inpuField.classList.add('not-active')
                    hidenDeleteBtn.classList.add('not-active')
                    
                       return clearErrors('tagsData')
                    
                }} className="delete-btn hiden-btn not-active">Delete</button>
            </div>
            </label>

            <button type="submit" className="send-btn">Send</button>
        </form>
        </div>
    )
}