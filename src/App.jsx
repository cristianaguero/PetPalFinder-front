import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutPublic from './layouts/LayoutPublic'
import LayoutPrivate from './layouts/LayoutPrivate'
import LayoutAdmin from './layouts/LayoutAdmin'
import NoPage from './pages/NoPage'
import WelcomePage from './pages/WelcomePage'
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage'
import MyPetsPage from './pages/MyPetsPage'
import ProfilePage from './pages/ProfilePage'
import About from './pages/About'
import AdminPage from './pages/AdminPage'
import ForgetPassword from './pages/ForgetPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import AddPet from './pages/admin/AddPet'
import SearchPet from './pages/admin/SearchPet'
import SearchUser from './pages/admin/SearchUser'
import AddUser from './pages/admin/AddUser'
import EditPet from './pages/admin/EditPet'

import { AuthContextProvider } from './context/AuthContext'

import EditUser from './pages/admin/EditUser'
import PetPage from './pages/PetPage'

function App() {

  const auth = localStorage.getItem('petPalsToken')

  return (

    <BrowserRouter>

      <AuthContextProvider>

        <Routes>
          <Route path='/' element={!auth ? <LayoutPublic /> : <LayoutPrivate /> }>
            <Route index element={<WelcomePage />} />
            <Route path='search' element={<SearchPage />} />
            <Route path='pet-page' element={<PetPage />} />
            <Route path='forget-password' element={<ForgetPassword />} />
            <Route path='forget-password/:token' element={<NewPassword />} />
            <Route path='confirm-account/:token' element={<ConfirmAccount />} />
            <Route path='about' element={<About />} />
          </Route>

          <Route path='user' element={<LayoutPrivate />  } >
            <Route index element={<UserPage />} />
            <Route path='my-pets' element={<MyPetsPage />} />
            <Route path='profile' element={<ProfilePage />} />
          </Route>

          <Route path='admin' element={<LayoutAdmin />  } >
            <Route index element={<AdminPage />} />
            <Route path='add-pet' element={<AddPet />} />
            <Route path='search-pet' element={<SearchPet />} />
            <Route path='edit-pet' element={<EditPet />} />
            <Route path='add-user' element={<AddUser />} />
            <Route path='search-user' element={<SearchUser />} />
            <Route path='edit-user' element={<EditUser />} />
          </Route>

          <Route path='*' element={<NoPage />} />

        </Routes>

      </AuthContextProvider>
    </BrowserRouter>



  )
}

export default App
