import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/Login.jsx'
import PricelistPage from './pages/Pricelist.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<PricelistPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
