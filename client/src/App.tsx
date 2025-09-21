import { Route, Routes } from 'react-router'
import './App.css'
import DisplayBooks from './pages/DisplayBooks/DisplayBooks'
import Home from './pages/Home/Home'
import EditBook from './pages/EditBook/EditBook'
import Admin from './pages/Admin/Admin'
import Signup from './pages/Signup/SignupPage'
import Signin from './pages/Signin/SigninPage'
import ProtectedRoutes from './utils/ProtectedRoutes'
import AddBook from './pages/AddBook/AddBook'
import ResetPassword from './pages/ResetPassword/ForgotPassword'
import ResetPasswordForm from './pages/ResetPasswordForm/ResetPasswordForm'
import EditAuthor from './pages/EditAuthor/EditAuthor'
import ProtectedAdminRoute from './utils/ProtectedAdminRoute'
import UserProfile from './pages/UserProfile/UserProfile'
import OrderInfo from './pages/OrderInfo/OrderInfo'
import Cart from './pages/Cart/Cart'

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

        <Route path='/user' element={
          <ProtectedRoutes>
            <UserProfile />
          </ProtectedRoutes>
        } />

        <Route path='/cart' element={
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        } />

        <Route path='/user/orders/:orderId' element={
          <ProtectedRoutes>
            <OrderInfo />
          </ProtectedRoutes>
        } />
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route index element={<Admin />} />
          <Route path="EditAuthor" element={<EditAuthor />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path='EditBook' element={<EditBook />} />
        </Route>

        <Route path='/books' element={
          <ProtectedRoutes>
            <DisplayBooks />
          </ProtectedRoutes>
        } />

      </Routes >
    </>
  )
}

export default App
