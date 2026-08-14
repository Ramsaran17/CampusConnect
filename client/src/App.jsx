import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Marketplace from './pages/Marketplace'
import CreateListing from './pages/CreateListing'
import ListingDetails from './pages/ListingDetails'
import LostFound from './pages/LostFound'
import LostFoundDetails from './pages/LostFoundDetails'
import EditLostFound from './pages/EditLostFound'
import Academic from './pages/Academic'
import AcademicDetails from './pages/AcademicDetails'
import EditAcademicResource from './pages/EditAcademicResource'
import Events from './pages/Events'
import Messages from './pages/Messages'
import EditListing from './pages/EditListing'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route
            path="/marketplace"
            element={<Marketplace />}
          />

          <Route
            path="/marketplace/:id"
            element={<ListingDetails />}
          />

          <Route
            path="/marketplace/:id/edit"
            element={<EditListing />}
          />

          <Route
            path="/lost-found"
            element={<LostFound />}
          />

          <Route
  path="/lost-found/:id"
  element={<LostFoundDetails />}
/>

<Route
  path="/lost-found/:id/edit"
  element={<EditLostFound />}
/>

          <Route
            path="/academic"
            element={<Academic />}
          />

          <Route
  path="/academic/:id"
  element={<AcademicDetails />}
/>

          <Route
            path="/academic/:id/edit"
            element={<EditAcademicResource />}
          />

          <Route
            path="/events"
            element={<Events />}
          />

        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/marketplace/create"
            element={<CreateListing />}
          />

          <Route
            path="/messages"
            element={<Messages />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App