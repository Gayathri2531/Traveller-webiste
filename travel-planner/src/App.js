import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import TripPlannerForm from './components/TripPlannerForm';
import SuggestionsPage from './components/SuggestionsPage';
import FinalSummary from './components/FinalSummary';

// Protected Route component to check authentication
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Login Page - Default route */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/trip-planner" 
            element={
              <ProtectedRoute>
                <TripPlannerForm />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/suggestions" 
            element={
              <ProtectedRoute>
                <SuggestionsPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/summary" 
            element={
              <ProtectedRoute>
                <FinalSummary />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route - redirect to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;