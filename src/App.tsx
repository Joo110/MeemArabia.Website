import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MeemHRPage from './components/MeemHRPage';
import MeemFinancePage from './components/MeemFinancePage';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hr" element={<MeemHRPage />} />
        <Route path="/finance" element={<MeemFinancePage />} />
      </Routes>
    </BrowserRouter>
  );
}
