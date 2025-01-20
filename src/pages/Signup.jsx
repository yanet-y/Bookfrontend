import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import '../assets/index.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const SignUpFunc = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    if (!email || !username || !password) {
      enqueueSnackbar('Please fill out all fields', { variant: 'error' });
      setLoading(false);
      return;
    }

    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    if (!isValidEmail) {
      enqueueSnackbar('Invalid email format', { variant: 'error' });
      setLoading(false);
      return;
    }

    try {
      const userInfo = { email, password, username };

      const res = await fetch('https://bookbackend-gamma.vercel.app/user/signup', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        enqueueSnackbar(data.error || 'Sign Up failed', { variant: 'error' });
        setLoading(false);
        return;
      }

      setEmail('');
      setPassword('');
      setUsername('');
      enqueueSnackbar('Sign Up successful. Check your email for verification.', { variant: 'success' });
      setLoading(false);
      navigate('/confirm-email', { state: { email, username, password } });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
      setLoading(false);
    }
  };

  return (
    <div className="form-div">
      <form onSubmit={SignUpFunc}>
        <p>Sign Up Form</p>
        <label>Username</label>
        <input
          className="input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
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
            {!loading && 'Sign Up'} {loading && 'Please wait...'}
          </button>
          <p>
            Already have an account yet?{' '}
            <span onClick={() => navigate('/')}>Login</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
