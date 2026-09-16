import React, { useState, useRef, KeyboardEvent, ClipboardEvent, useEffect } from 'react';
import { cn } from '../utils/cn';
import AnimatedIcon from './animated_icon';

export interface OTPBoxProps {
  /** Number of digits for the OTP (commonly 4 or 6) */
  length?: 4 | 6;
  /** Verification method determines the icon and text */
  method?: 'email' | 'phone';
  /** The email address or phone number the code was sent to */
  targetValue?: string;
  /** Callback triggered on every change */
  onChange?: (otp: string) => void;
  /** Callback triggered only when all digits are filled */
  onComplete?: (otp: string) => void;
  /** Optional custom classes */
  className?: string;
}

export const OTPBox: React.FC<OTPBoxProps> = ({
  length = 6,
  method = 'email',
  targetValue = 'user@example.com',
  onChange,
  onComplete,
  className
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update refs array size if length changes
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Take only the last character if multiple are entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const otpString = newOtp.join('');
    if (onChange) onChange(otpString);
    if (otpString.length === length && onComplete) onComplete(otpString);

    // Focus next input if a digit was entered
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current input is empty, focus previous and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
        
        const otpString = newOtp.join('');
        if (onChange) onChange(otpString);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    // Check if pasted data contains only numbers
    if (!/^\d+$/.test(pastedData)) return;

    const pastedDigits = pastedData.slice(0, length).split('');
    const newOtp = [...otp];
    
    pastedDigits.forEach((digit, i) => {
      newOtp[i] = digit;
    });
    
    setOtp(newOtp);
    
    const otpString = newOtp.join('');
    if (onChange) onChange(otpString);
    if (otpString.length === length && onComplete) onComplete(otpString);

    // Focus the next empty input, or the last input if full
    const nextEmptyIndex = newOtp.findIndex(val => val === '');
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  // Lordicons based on method
  const getIconSrc = () => {
    if (method === 'phone') {
      // Animated Smartphone Icon
      return "https://cdn.lordicon.com/qhgmphtg.json"; 
    }
    // Animated Mail/Envelope Icon
    return "https://cdn.lordicon.com/diihvcfp.json";
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-6 sm:p-8 bg-surface border border-border-main rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] w-full max-w-md mx-auto text-center",
      className
    )}>
      {/* Animated Icon Loop */}
      <div className="mb-4 bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center">
        <AnimatedIcon 
          src={getIconSrc()} 
          size={48} 
          trigger="loop" 
          delay={800} // .8 second interval as requested
          primaryColor="var(--primary-color)" 
          secondaryColor="var(--text-primary)"
        />
      </div>

      <h2 className="text-2xl font-bold font-headingA text-text-main mb-2">
        Verification Code
      </h2>
      <p className="text-sm text-text-sec mb-8">
        We've sent a {length}-digit code to<br />
        <span className="font-semibold text-text-main">{targetValue}</span>
      </p>

      {/* OTP Inputs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 w-full mb-8" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "flex-1 max-w-[3rem] h-12 sm:max-w-[3.5rem] sm:h-14 md:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl outline-none transition-all duration-200",
              "bg-bg border-2 border-border-main text-text-main",
              "focus:border-primary focus:bg-surface focus:shadow-[0_0_0_4px_rgba(var(--primary-rgb),0.1)]",
              digit ? "border-primary/50 bg-primary/5" : ""
            )}
          />
        ))}
      </div>

      {/* Footer / Resend */}
      <div className="text-sm font-medium text-text-sec flex items-center justify-center gap-1">
        Didn't receive the code? 
        <button className="text-primary hover:text-primary/80 font-semibold transition-colors focus:outline-none">
          Resend
        </button>
      </div>
    </div>
  );
};

export default OTPBox;
