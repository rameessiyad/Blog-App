import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Sign from './pages/Sign'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ErrorPage from './pages/ErrorPage'
import Header from './components/Header'
import FooterComponent from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import SearchTerm from './components/SearchTerm'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<Sign />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/search' element={<SearchTerm />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default App