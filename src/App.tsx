import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";

const CloudX = lazy(() =>
  import("./pages/demo-1/CloudX").then((m) => ({ default: m.CloudX })),
);
const Rinacita = lazy(() =>
  import("./pages/demo-2/Rinacita").then((m) => ({ default: m.Rinacita })),
);
const Lupa = lazy(() =>
  import("./pages/demo-3/lupa").then((m) => ({ default: m.Lupa })),
);
const NightCity = lazy(() =>
  import("./pages/demo-4/NightCity").then((m) => ({ default: m.NightCity })),
);
const Fashion = lazy(() =>
  import("./pages/demo-5/Fashion").then((m) => ({ default: m.Fashion })),
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
        <Route path="/demo-1" element={<CloudX />} />
        <Route path="/demo-2" element={<Rinacita />} />
        <Route path="/demo-3" element={<Lupa />} />
        <Route path="/demo-4" element={<NightCity />} />
        <Route path="/demo-5" element={<Fashion />} />
        <Route path="/demo-6" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
