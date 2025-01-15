import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';  // Import the CSS file

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); // Change to dashboard
  };

  return (
    <div className="error-page-container">
        <p className="error-message">We cannot find this page</p>
        <p className="error-description">Either the URL doesn't exist, or you don't have access to it</p>
        <Button
            onClick={handleClick}
            className="error-button"
            aria-label="Go to the main dashboard"
        >
            Go to the main dashboard
        </Button>
    </div>
  );
}

export default ErrorPage;
