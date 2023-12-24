export const articlesAddAction = (data) => ({type: 'ADD', payload: data})
export const changePage = (data) => ({type: 'NEXT-PAGE', payload: data})
export const noLoad = () => ({type: 'NOLOAD'})
export const renewPage= (data) => ({type: 'REFRESH', payload: data})

export const getArticleSlug = (data) => ({type: 'SLUG', payload: data})
export const getCurrentArticle = (data) => ({type:'ARTICLE', payload: data})

export const isLoaded = () => ({type: 'ISLOAD'})
export const addPageValue = (data) => ({type: 'PAGE', payload: data})