import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import UpdatesPage from './components/UpdatesPage/UpdatesPage';
import ErrorPage from './components/ErrorPage/ErrorPage';

const isAuthenticated = false;
function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<UpdatesPage />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <UpdatesPage /> : <Navigate to="/error-unauthenticated" />}
        />

        <Route 
          path="/error-unauthenticated" 
          element={<ErrorPage message="You are not authenticated to view this page." />} 
        />
        <Route 
          path="*" 
          element={<ErrorPage />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
