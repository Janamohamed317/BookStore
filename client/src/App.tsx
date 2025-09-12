import { Route, Routes } from 'react-router'
import './App.css'
import DisplayBooks from './pages/DisplayBooks/DisplayBooks'
import Home from './pages/Home/Home'
import EditBook from './pages/EditBook/EditBook'
import Authors from './pages/Authors/Authors'
import Admin from './pages/Admin/Admin'
import Signup from './pages/Signup/Signup'
import Signin from './pages/Signin/Signin'
import ProtectedRoutes from './utils/ProtectedRoutes'
import AddBook from './pages/AddBook/AddBook'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import ResetPasswordForm from './pages/ResetPasswordForm/ResetPasswordForm'
import EditAuthor from './pages/EditAuthor/EditAuthor'

function App() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPasswordForm />} />

        <Route path='/' element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        } />

        <Route path='/EditAuthor' element={
          <ProtectedRoutes>
            <EditAuthor />
          </ProtectedRoutes>
        } />

        <Route path='/admin' element={
          <ProtectedRoutes>
            <Admin />
          </ProtectedRoutes>
        } />

        <Route path='/authors' element={
          <ProtectedRoutes>
            <Authors />
          </ProtectedRoutes>
        } />

        <Route path='/books' element={
          <ProtectedRoutes>
            <DisplayBooks />
          </ProtectedRoutes>
        } />

        <Route path='/EditBook' element={
          <ProtectedRoutes>
            <EditBook />
          </ProtectedRoutes>
        } />


        <Route path='/addBook' element={
          <ProtectedRoutes>
            <AddBook />
          </ProtectedRoutes>
        } />

      </Routes >
    </>
  )
}

export default App
