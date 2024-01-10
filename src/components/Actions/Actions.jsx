export const articlesAddAction = (arr) => ({ type: 'ADD', payload: arr });
export const changePage = (data) => ({ type: 'NEXT-PAGE', payload: data });
export const noLoad = () => ({ type: 'NOLOAD' });
export const renewPage = (data) => ({ type: 'REFRESH', payload: data });

export const getArticleSlug = (data) => ({ type: 'SLUG', payload: data });
export const getCurrentArticle = (data) => ({ type: 'ARTICLE', payload: data });

export const isLoaded = () => ({ type: 'ISLOAD' });
export const addPageValue = (data) => ({ type: 'PAGE', payload: data });

export const isSignedUp = (data) => ({ type: 'SIGNUP', payload: data });

export const addNewUser = (data) => ({ type: 'ADD-USER', payload: data });
export const randomAvatarUrl = (data) => ({ type: 'AVATAR', payload: data });
export const addLoginData = (data) => ({ type: 'LOGIN', payload: data });

export const errorWhileRegistering = (data) => ({ type: 'ERROR', payload: data });
export const editeProfiledata = (data) => ({ type: 'EDIT', payload: data });
export const addTag = (data) => ({ type: 'TAG', payload: data });
export const createdArticleData = (data) => ({ type: 'CREATED', payload: data });

export const editedArticleData = (data) => ({ type: 'EDITA', payload: data });
