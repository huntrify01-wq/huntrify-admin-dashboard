import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmailInput from '../../components/form_components/EmailInput';
import PasswordInput from '../../components/form_components/PasswordInput';
import PrimaryButton from '../../components/button/PrimaryButton';
import ButtonWithIcon from '../../components/button/ButtonWithIcon';
import ThemeToggle from '../../components/themetoggle';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-bg px-4 py-16 relative overflow-hidden">
      
      {/* Optional decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      {/* Floating Theme Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md bg-surface border border-border-main rounded-[24px] shadow-xl p-6 sm:p-10 relative z-10 my-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 mb-4">
            <img src="/logo/logo-icon.png" alt="Huntrify Logo" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="text-2xl font-bold font-headingA text-text-main mb-2">Welcome Back</h1>
          <p className="text-text-sec text-sm">Please sign in to continue to Huntrify</p>
        </div>

        {/* Actions - Google Button First */}
        <div className="flex flex-col gap-4 mb-6">
          <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-surface hover:bg-surface-hover border border-border-main text-text-main py-2.5 px-4 rounded-lg transition-colors font-medium shadow-sm"
            onClick={() => navigate('/user-management/overview')}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-border-main"></div>
          <span className="flex-shrink-0 mx-4 text-text-sec text-xs font-medium uppercase tracking-wider">Or</span>
          <div className="flex-grow border-t border-border-main"></div>
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col gap-5 mb-8">
          <EmailInput placeholder="you@company.com" />
          <PasswordInput label="Password" placeholder="Enter your password" showStrength={false} />
        </div>

        {/* Sign In Button */}
        <div className="w-full">
          <PrimaryButton onClick={() => navigate('/user-management/overview')} className="w-full justify-center py-3">
            Sign In with Email
          </PrimaryButton>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
