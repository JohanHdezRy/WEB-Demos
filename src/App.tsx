import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'

const Restaurant    = lazy(() => import('./pages/demo-1/Restaurant').then(m => ({ default: m.Restaurant })))
const ECommerce     = lazy(() => import('./pages/demo-2/ECommerce').then(m => ({ default: m.ECommerce })))
const Agency        = lazy(() => import('./pages/demo-3/Agency').then(m => ({ default: m.Agency })))
const Studio        = lazy(() => import('./pages/demo-4/Studio').then(m => ({ default: m.Studio })))
const RealEstate    = lazy(() => import('./pages/demo-5/RealEstate').then(m => ({ default: m.RealEstate })))
const AdventurePark = lazy(() => import('./pages/demo-6/AdventurePark').then(m => ({ default: m.AdventurePark })))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111]">
      <span className="text-white/30 text-sm tracking-[4px] uppercase animate-pulse">Loading…</span>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"       element={<Landing />} />
        <Route path="/demo-1" element={<Restaurant />} />
        <Route path="/demo-2" element={<ECommerce />} />
        <Route path="/demo-3" element={<Agency />} />
        <Route path="/demo-4" element={<Studio />} />
        <Route path="/demo-5" element={<RealEstate />} />
        <Route path="/demo-6" element={<AdventurePark />} />
      </Routes>
    </Suspense>
  )
}
