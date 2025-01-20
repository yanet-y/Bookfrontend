import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../assets/index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const LoginFunc = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      enqueueSnackbar('Please fill out all fields', { variant: 'error' });
      setLoading(false);
      return;
    }

    try {
      const userInfo = { email, password };

      const res = await fetch('https://bookbackend-gamma.vercel.app/user/login', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const userData = await res.json();

      if (!res.ok) {
        if (userData.error === 'Please verify your email before logging in') {
          enqueueSnackbar('Please verify your email before logging in.', { variant: 'warning' });
          navigate('/confirm-email', { state: { email } });
        } else {
          enqueueSnackbar(userData.error || 'Login failed', { variant: 'error' });
        }
        setLoading(false);
        return;
      }

      localStorage.clear();
      localStorage.setItem('userData', JSON.stringify(userData));
      enqueueSnackbar('Login successful!', { variant: 'success' });
      navigate('/books');
      setLoading(false);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
      setLoading(false);
    }
  };

  return (
    <div className="form-div">
      <form onSubmit={LoginFunc}>
        <p>Login Form</p>
        <label>Email</label>
        <input
          className="input"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <label>Password</label>
        <input
          className="input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <div className="login-div flex flex-column">
          <button className="button" type="submit" disabled={loading}>
            {!loading && 'LOG IN'} {loading && 'Please wait...'}
          </button>
          <p>
            Don't have an account yet?{' '}
            <span onClick={() => navigate('/signup')}>Sign Up Here</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
