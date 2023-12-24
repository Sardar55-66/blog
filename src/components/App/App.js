import { useEffect } from 'react';
import { Article } from '../Article/Article';
import { CreateArticle } from '../Create-article/Create-article';
import { HeaderLogo, CreateArticleBtn, HeaderUser, LogOut, SignIn, SignUp } from '../Header-components/Header-components';
import { ListOfArticles } from '../List/List';
import { getArticles } from '../api/get-api-data';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PaginationControlled from '../Pagination/Pagination';
import CircularWithValueLabel from '../Spinner/Spinner';
import { NoArticle } from '../No-article-error/No-article-error';
import { DeleteArticle } from '../Delete-article/Delete-article';
import { EditArticle } from '../Edit-article/Edit-article';
import { EditProfile } from '../Edit-profile/Edit-profile';
import { SignInForm } from '../Sign-in/Sign-in';
import { SignUpForm } from '../Sign-up/Sign-up';

function App() {

  

  const dispatch = useDispatch()
  useEffect(() => {dispatch(getArticles())}, [])
  
  const isLoaded = useSelector(state => state.articles.isLoaded)
  const articles = useSelector(state => state.articles.articles)
  const slug = useSelector(state => state.slug.slug)
  const page = useSelector(state => state.page.page)

  
  


  return (

    <>    
    
    
      <div className="App">

        <header className='header'>
          <div className='header__logo'>
            <Routes>
              <Route path="*" element={<HeaderLogo/>}/>
            </Routes>
          </div>
        <div className='header__info'>
          <Routes>
            <Route path='*' element={
              <>
              <SignUp/>
              <SignIn/>
              </>
              
            }/>
          </Routes>
        </div>
      </header>
      
      {articles.length === 0 ? <NoArticle/>: null}
     
  {!isLoaded ? <CircularWithValueLabel/> : articles.map((article) => {
   return <Routes>
    <Route path="/" element={
      <>
      <ListOfArticles key={article.slug} data={article}/>
      <PaginationControlled/>
      
      </>
    }/>  
   </Routes>
  })}
<Routes>
    <Route path='/signup' element={
    <>
    <SignUpForm/>
    <Link className='main-page-redirect' to="/"><span className='main-page'>back</span></Link>
    </>
    }/>
    <Route path='/signin' element={
    <>
    <SignInForm/>
    <Link className='main-page-redirect' to="/"><span className='main-page'>back</span></Link>
    </>
    }/>
    
  
  <Route path="/articles/:slug?" element={
  <>
    {isLoaded ? null : <CircularWithValueLabel/>}
    <Article slug={slug}/>
    <Link className='main-page-redirect' to="/"><span className='main-page'>back</span></Link>
  </>
  }/>
  </Routes>
</div>

</>

  );
}

export default App;
