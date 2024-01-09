
import { redirect } from "react-router-dom";
import { addLoginData, addLoginStatus, addNewUser, articlesAddAction, changePage, createdArticleData, editeProfiledata, errorWhileRegistering, getCurrentArticle, isLoaded, noLoad, randomAvatarUrl, renewPage } from "../Actions/Actions";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { editedArticle } from "../Reducers/Reducers";




const url = 'https://blog.kata.academy/api'


export const getArticles = () => {
    return async (dispatch) => {
        const data = await fetch('https:/blog.kata.academy/api/articles')
        const data2 = await data.json()
        const articles = data2.articles
        setTimeout(() => {
            dispatch(articlesAddAction(articles))
        }, 1000);
        dispatch(noLoad())
    }
}

export const nextPage = () => {
    return async (dispatch) => {
        dispatch(noLoad())
        
        const data = await fetch('https://blog.kata.academy/api/articles')
        const data2 = await data.json()
        const articles = data2.articles
        setTimeout(() => {
            dispatch(isLoaded())
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
            dispatch(isLoaded())
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

export const registerUser = (data) => {
    
    const { name, mail, pass } = data

    return async (dispatch) => {
        dispatch(noLoad())
            try {
                const user = {
                    username: name,
                    email: mail,
                    password: pass
                }  
                const data1 = await fetch('https:///blog.kata.academy/api/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  user,
                })
              });

              const userData = await data1.json()
              
            if (userData.user) {
                localStorage.clear()
                localStorage.setItem('token', JSON.stringify(userData.user.token))
                console.log(userData.user.token)
                
                dispatch(addNewUser(userData))
                dispatch(isLoaded())
    
              } else if (userData.errors) {
                console.log(userData.errors)
              }
            } catch (error) {
                console.log(error)
            }

            
        }
}




export const getLoggendInUser = () => {

    

    return async (dispatch) => {
        dispatch(noLoad())
        const token = JSON.parse(localStorage.getItem('token'))

        
            const res = await fetch('https:///blog.kata.academy/api/user', {
            headers: {
              'Authorization': `Token ${token}`
            }
          });
                const userDetails = await res.json()
                dispatch(addLoginData(userDetails))
                dispatch(isLoaded())

        
        
    }
    
}



export const editedProfile = (data) => {
    

const { editedName, editedMail, editedPass, editedAvatarImage } = data
    return async (dispatch) => {
        dispatch(noLoad())
    
        
    const token = JSON.parse(localStorage.getItem('token'))

        const editedUser = {
            email: editedMail,
            username: editedName,
            password: editedPass,
            bio: 'I work at State Farm',
            image: editedAvatarImage
        }

        const user = JSON.stringify(editedUser)


        if (token) {
            const response = await axios.put(
              `${url}/user`,
              {
                user,
              },
              {
                headers: {
                  Authorization: `Token ${token}`,
                },
              }
            );
            console.log(response)
            if (response.status === 200) {
                console.log('200')
                dispatch(getLoggendInUser())
                dispatch(editeProfiledata(response.data.user))
                dispatch(isLoaded())
            }
            console.log(response.data.user)
            return response.data;
          } return new Error('Unathorized')
          
    }
}


export const createArticleApi = (data, tags) => {

    const { title, description, text } = data

    return async (dispatch) => {
        dispatch(noLoad())
        const token = JSON.parse(localStorage.getItem('token'))
        

        const articleData = {
                title: title,
                description: description,
                body: text,
                tagList: [...tags]
                }

        
     
        const res = await axios.post(`${url}/articles`, 
            {
                article : articleData
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            }
            
          );
            console.log(res)
                dispatch(createdArticleData(res.data))
                dispatch(isLoaded())
                   
        }   
}

export const deleteArticleApi = async (slug) => {


    
        dispatch(noLoad())
        const token = JSON.parse(localStorage.getItem('token'))        
     
        const result = await axios.delete(`${url}/articles/${slug}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            }
            
          );
          dispatch(isLoaded())
                
          return result
}



export const editArticleApi = (data, slug) => {

    const { title, description, text } = data


    return async (dispatch) => {
        dispatch(noLoad())
        const token = JSON.parse(localStorage.getItem('token'))
        

        const articleData = {
                title: title,
                description: description,
                body: text,
                }

        
     
        const res = await axios.post(`${url}/articles/${slug}`, 
            {
                article : articleData
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            }
            
          );
            console.log(res)
                dispatch(editedArticle(res.data))
                dispatch(isLoaded())
                   
        }   
}


