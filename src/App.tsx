import { Routes, Route } from 'react-router-dom'
import { Landing }    from './pages/Landing'
import { Restaurant } from './pages/demo-1/Restaurant'
import { ECommerce }  from './pages/demo-2/ECommerce'
import { Agency }     from './pages/demo-3/Agency'
import { Studio }     from './pages/demo-4/Studio'
import { RealEstate } from './pages/demo-5/RealEstate'
import { AdventurePark } from './pages/demo-6/AdventurePark'

export default function App() {
  return (
    <Routes>
      <Route path="/"       element={<Landing />} />
      <Route path="/demo-1" element={<Restaurant />} />
      <Route path="/demo-2" element={<ECommerce />} />
      <Route path="/demo-3" element={<Agency />} />
      <Route path="/demo-4" element={<Studio />} />
      <Route path="/demo-5" element={<RealEstate />} />
      <Route path="/demo-6" element={<AdventurePark />} />
    </Routes>
  )
}
