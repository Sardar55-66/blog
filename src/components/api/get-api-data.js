import { useSelector } from "react-redux"
import { addLoginData, addLoginStatus, addNewUser, articlesAddAction, changePage, errorWhileRegistering, getCurrentArticle, isLoaded, noLoad, randomAvatarUrl, renewPage } from "../Actions/Actions"
import { useNavigate } from "react-router-dom"
import { loggingIn } from "../Reducers/Reducers"
import axios from 'axios';






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

export const registerUser = (data) => {
    
    const { name, mail, pass } = data

    return async (dispatch) => {
    
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
                const token = localStorage.getItem('token')
                console.log(token)
                
                dispatch(addNewUser(userData))
    
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
        const token = JSON.parse(localStorage.getItem('token'))

        try {
            const res = await fetch('https:///blog.kata.academy/api/user', {
            headers: {
              'Authorization': `Token ${token}`
            }
          });
                const userDetails = await res.json()
                console.log(userDetails)
                dispatch(addLoginData(userDetails))

        } catch (error) {
            console.log(error)
        }
        
    }
    
}



export const editedProfile = (data) => {
    const url = 'https://blog.kata.academy/api'

const { editedName, editedMail, editedPass, editedAvatarImage } = data
    return async (dispatch) => {
        
    console.log(data)
        
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
            return response.data;
          } return new Error('Unathorized')
          
    }
}


