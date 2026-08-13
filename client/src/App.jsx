import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Marketplace from './pages/Marketplace'
import LostFound from './pages/LostFound'
import Academic from './pages/Academic'
import Events from './pages/Events'
import Messages from './pages/Messages'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/lost-found" element={<LostFound />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/events" element={<Events />} />
          <Route path="/messages" element={<Messages />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App