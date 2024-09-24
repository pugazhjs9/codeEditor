import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, login } from './api';
import './Auth.css'; // Import the CSS file

function Auth() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSignup, setIsSignup] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Memoized handler to avoid unnecessary re-renders
  const handleChange = useCallback((e) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }, []);

  // Clear form inputs
  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      setIsLoading(true); // Show loading indicator

      // Fire API call
      const response = isSignup ? await signup({ name, email, password }) : await login({ email, password });

      if (isSignup) {
        clearForm(); // Clear the form
        navigate('/auth'); // Immediately navigate to login page after signup
      } else {
        localStorage.setItem('token', response.token);
        const userEmail = email.split('@')[0];
        localStorage.setItem('user', name);
        navigate('/home'); // Immediately navigate to the home page after login
      }
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false); // Hide loading indicator after the operation is completed
    }
  };

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="title">{isSignup ? 'Signup' : 'Login'}</h2>

        {isSignup && (
          <div className="mb-4">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="mb-6">
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Submitting...' : isSignup ? 'Signup' : 'Login'}
        </button>

        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className="switch-button"
          disabled={isLoading}
        >
          {isSignup ? 'Already have an account? Login' : 'Don\'t have an account? Signup'}
        </button>
      </form>
    </div>
  );
}

export default Auth;
