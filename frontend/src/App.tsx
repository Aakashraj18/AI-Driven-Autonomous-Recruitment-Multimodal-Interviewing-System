import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UploadView from './pages/UploadView';
import CandidatesView from './pages/CandidatesView';
import InterviewRoom from './pages/InterviewRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<UploadView />} />
          <Route path="candidates" element={<CandidatesView />} />
          <Route path="interview" element={<InterviewRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
