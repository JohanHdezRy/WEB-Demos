import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";

const Corpo = lazy(() =>
  import("./pages/demo-1/Corpo").then((m) => ({ default: m.Corpo })),
);
const ECommerce = lazy(() =>
  import("./pages/demo-2/ECommerce").then((m) => ({ default: m.ECommerce })),
);
const Agency = lazy(() =>
  import("./pages/demo-3/Agency").then((m) => ({ default: m.Agency })),
);
const NightCity = lazy(() =>
  import("./pages/demo-4/NightCity").then((m) => ({ default: m.NightCity })),
);
const RealEstate = lazy(() =>
  import("./pages/demo-5/RealEstate").then((m) => ({ default: m.RealEstate })),
);
const Dashboard = lazy(() =>
  import("./pages/demo-6/Dashboard").then((m) => ({ default: m.Dashboard })),
);

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111]">
      <span className="text-white/30 text-sm tracking-[4px] uppercase animate-pulse">
        Loading…
      </span>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/demo-1" element={<Corpo />} />
        <Route path="/demo-2" element={<ECommerce />} />
        <Route path="/demo-3" element={<Agency />} />
        <Route path="/demo-4" element={<NightCity />} />
        <Route path="/demo-5" element={<RealEstate />} />
        <Route path="/demo-6" element={<Dashboard />} />{" "}
      </Routes>
    </Suspense>
  );
}
