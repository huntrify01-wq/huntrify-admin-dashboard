import React, { useState } from 'react';
import { Input } from './Input';
import { cn } from './Input';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  showStrength?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label = "Password", error, showStrength = true, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      onChange?.(e);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    // Calculate password strength
    const calculateStrength = (pass: string) => {
      let score = 0;
      if (!pass) return { score: 0, label: '', color: 'bg-transparent' };
      if (pass.length >= 6) score += 1;
      if (pass.length >= 8) score += 1;
      if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
      if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score += 1;

      if (score <= 1) return { score, label: 'Weak', color: 'bg-error', width: 'w-1/4' };
      if (score === 2) return { score, label: 'Fair', color: 'bg-warning', width: 'w-2/4' };
      if (score === 3) return { score, label: 'Good', color: 'bg-primary', width: 'w-3/4' };
      return { score, label: 'Strong', color: 'bg-success', width: 'w-full' };
    };

    const strength = calculateStrength(password);

    return (
      <div className="flex flex-col w-full gap-1.5">
        <Input
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          label={label}
          error={error}
          onChange={handleChange}
          className={cn(
            !showPassword && "text-[18px] tracking-[0.15em]", // Makes the dots noticeably bigger and spaced out
            className
          )}
          suffix={
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="p-1 rounded-full text-text-sec hover:text-text-main transition-colors focus:outline-none"
            >
              <i className={cn("text-[18px]", showPassword ? "ri-eye-off-line" : "ri-eye-line")} />
            </button>
          }
          {...props}
        />
        
        {/* Strength Meter */}
        {showStrength && password.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-1 px-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex justify-between items-center text-[11px] font-medium">
              <span className="text-text-sec">Password Strength</span>
              <span className={cn(
                strength.score <= 1 && 'text-error',
                strength.score === 2 && 'text-warning',
                strength.score === 3 && 'text-primary',
                strength.score >= 4 && 'text-success'
              )}>{strength.label}</span>
            </div>
            <div className="h-1 w-full bg-border-main rounded-full overflow-hidden">
              <div 
                className={cn("h-full transition-all duration-300 ease-out", strength.color, strength.width)} 
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;
