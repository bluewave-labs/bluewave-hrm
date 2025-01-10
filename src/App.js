import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UpdatesPage from './components/UpdatesPage/UpdatesPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<UpdatesPage />} />
                    <Route path="/dashboard" element={<PrivateRoute />} />
                    <Route path="/error-unauthenticated" element={<ErrorPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;