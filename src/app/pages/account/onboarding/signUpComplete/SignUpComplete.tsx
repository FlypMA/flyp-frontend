import Heading1 from '@/shared/components/typography/Heading1';
import { authService } from '@/shared/services/auth';
import { logger } from '@/shared/utils/logger';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UrlGenerator } from '../../../../../shared/services/urls/urlGenerator';
// import { Button } from '@/shared/components/buttons'; // TODO: Implement button functionality

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
          setMessage('Email verified successfully!');
          setTimeout(() => navigate(UrlGenerator.accountDashboard()), 3000);
        } else {
          setVerificationStatus('error');
          setMessage(response.error || 'Verification failed');
        }
      } catch (error) {
        logger.error("Error occurred", error);
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
        await authService.resendVerification(email);
        alert('Verification email has been resent. Please check your inbox.');
      } catch (error) {
        logger.error("Error occurred", error);
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
            to={UrlGenerator.accountDashboard()}
            className="mt-4 w-full bg-white hover:bg-zinc-100 text-black py-3 px-6 rounded-lg font-medium transition-all text-center inline-block"
            data-conversion="CTA - Get started"
          >
            Get started
          </Link>
        </div>
      </div>
      <div className="hidden md:block bg-gradient-to-br from-primary-50 to-calm-50"></div>
    </div>
  );
};

export default SignUpComplete;
