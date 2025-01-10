import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ message }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>We cannot find this page</h1>
      <p style={styles.text}>{message || 'Either the URL doesn’t exist, or you don’t have access to it.'}</p>
      <Link to="/" style={styles.button}>
        Go to the main dashboard
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
    color: '#666',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#6c63ff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default ErrorPage;