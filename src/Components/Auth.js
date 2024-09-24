import React, { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      setIsLoading(true); // Set loading to true when submission starts

      const response = isSignup ? await signup({ name, email, password }) : await login({ email, password });
      setIsLoading(false); // Stop loading when the API responds
      alert(isSignup ? 'Signup successful!' : 'Login successful!');
      clearForm();

      if (isSignup) {
        navigate('/auth');
      } else {
        localStorage.setItem('token', response.token);
        const userEmail = email.split('@')[0];
        localStorage.setItem('user', userEmail); 
        navigate('/home');
      }
    } catch (error) {
      setIsLoading(false); // Stop loading on error as well
      alert(error.message || 'Something went wrong');
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
