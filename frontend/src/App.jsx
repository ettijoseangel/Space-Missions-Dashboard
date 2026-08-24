import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { MissionDetail } from "./pages/MissionDetail";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Toaster theme="dark" richColors position="top-right" />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mission/:id" element={<MissionDetail />} />
        {/* 404 HASTA EL FINAL DE ROUTES */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
