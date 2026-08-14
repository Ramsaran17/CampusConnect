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
import Academic from './pages/Academic'
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
            path="/academic"
            element={<Academic />}
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