import { articlesAddAction, changePage, getCurrentArticle, isLoaded, noLoad, renewPage } from "../Actions/Actions"






export const getArticles = () => {
    return async (dispatch) => {
        const data = await fetch('https://blog.kata.academy/api/articles')
        const data2 = await data.json()
        const articles = data2.articles
        const articlesCount = data2.articlesCount
        setTimeout(() => {
            dispatch(articlesAddAction(articles))
        }, 1000);
        dispatch(noLoad())
    }
}

export const nextPage = () => {
    return async (dispatch) => {
        dispatch(noLoad())
        
        const data = await fetch('https://blog.kata.academy/api//articles')
        const data2 = await data.json()
        const articles = data2.articles
        setTimeout(() => {
            dispatch(changePage(articles))
        }, 1000);
    }
}



export const refreshArticles = () => {
    
    return async (dispatch) => {
        dispatch(noLoad())
        const data = await fetch('https://blog.kata.academy/api/articles')
        const data2 = await data.json()
        const articles = data2.articles
        setTimeout(() => {
            dispatch(renewPage(articles))
        }, 1000);
        dispatch(noLoad())
    }
}



export const getArticle = (slug) => {
    
    return async (dispatch) => {
        dispatch(noLoad())
        const data = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
        const article = await data.json()
        setTimeout(() => {
            dispatch(getCurrentArticle(article))
            dispatch(isLoaded())
        }, 1000);
        
    }
}