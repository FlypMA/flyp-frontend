import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Heading1 from '@/app/components/main_UI/fonts/heading1';
import { authService } from '@/app/services/users/authenticationService';
import UrlGeneratorService from '@/app/services/urlMapping/urlGeneratorService';
import { Button } from '@heroui/react';

const SignUpComplete: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const emailParam = query.get('email');
  const email = emailParam ? decodeURIComponent(emailParam) : '';
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>(
    'pending'
  );
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setVerificationStatus('error');
        setMessage('No verification token provided');
        return;
      }

      try {
        const response = await authService.verifyEmail(token);
        if (response.success) {
          setVerificationStatus('success');
          setMessage(response.message || 'Email verified successfully!');
          setTimeout(() => navigate(UrlGeneratorService.accountDashboard()), 3000);
        } else {
          setVerificationStatus('error');
          setMessage(response.message || 'Verification failed');
        }
      } catch (error) {
        setVerificationStatus('error');
        setMessage('Verification failed. Please try again.');
      }
    };

    verifyToken();
  }, [token, navigate]);

  const resendVerificationEmail = async () => {
    if (email) {
      try {
        setResending(true);
        await authService.resendVerificationEmail(email);
        alert('Verification email has been resent. Please check your inbox.');
      } catch (error) {
        console.error('Error resending verification email:', error);
        alert('Failed to resend verification email. Please try again later.');
      } finally {
        setResending(false);
      }
    } else {
      alert('Email address is not available.');
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-[40%_60%] h-screen">
      <div className="p-4 flex">
        <div className="m-auto max-w-sm">
          <Heading1>Verify your email</Heading1>
          <p className="text-sm text-zinc-500">
            We have sent an email to your inbox to verify your account. Please click on the link in
            the email to continue.
          </p>
          <button
            onClick={resendVerificationEmail}
            disabled={resending}
            className="mt-4 w-full bg-white hover:bg-zinc-100 text-black py-3 px-6 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resending ? 'Resending...' : 'Resend verification email'}
          </button>

          {verificationStatus === 'success' && (
            <p className="text-sm text-success-500 mt-4">{message}</p>
          )}
          {verificationStatus === 'error' && (
            <>
              <p className="text-sm text-red-500 mt-4">{message}</p>
            </>
          )}

          <Link
            to={UrlGeneratorService.accountDashboard()}
            className="mt-4 w-full bg-white hover:bg-zinc-100 text-black py-3 px-6 rounded-lg font-medium transition-all text-center inline-block"
            data-conversion="CTA - Get started"
          >
            Get started
          </Link>
        </div>
      </div>
      <div className="hidden md:block bg-[url('../src/assets/background4.jpg')] bg-cover"></div>
    </div>
  );
};

export default SignUpComplete;
