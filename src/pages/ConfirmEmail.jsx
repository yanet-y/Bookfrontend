import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const ConfirmEmail = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state;
  const { enqueueSnackbar } = useSnackbar();

  const verifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://bookbackend-gamma.vercel.app/user/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email, verificationNumber: verificationCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        enqueueSnackbar(data.error || 'Verification failed. Please try again.', { variant: 'error' });
        setLoading(false);
        return;
      }

      enqueueSnackbar('Email verified successfully! You can now log in.', { variant: 'success' });
      setLoading(false);
      navigate('/'); // Redirect to login 
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
      setLoading(false);
    }
  };

  return (
    <div className="form-div">
      <form onSubmit={verifyEmail}>
        <p>Email Verification</p>
        <label>Verification Code</label>
        <input
          className="input"
          type="text"
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter your verification code"
        />
        <button className="button" type="submit" disabled={loading}>
          {!loading && 'Verify Email'} {loading && 'Verifying...'}
        </button>
      </form>
    </div>
  );
};

export default ConfirmEmail;
