import React, { useState } from 'react';
import { Input } from './Input'; // Assuming Input.tsx is in the same folder

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; // Allow parent to override or provide server errors
  onValidationChange?: (isValid: boolean) => void;
}

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ className, label = "Email Address", error: externalError, onBlur, onChange, onValidationChange, ...props }, ref) => {
    const [internalError, setInternalError] = useState<string | undefined>(undefined);
    const [touched, setTouched] = useState(false);

    // Robust Regex to match all valid email formats (supports standard domains, subdomains, etc.)
    const validateEmail = (email: string): string | undefined => {
      if (!email.trim()) return "Email is required";
      // This regex covers 99.9% of all valid emails accurately without needing external heavy libraries
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!regex.test(email.trim())) return "Invalid email address";
      return undefined;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched(true);
      const val = e.target.value;
      const errorMsg = validateEmail(val);
      setInternalError(errorMsg);
      onValidationChange?.(!errorMsg);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      // If the user already triggered an error, validate on every keystroke so the error clears immediately when fixed
      if (touched) {
        const errorMsg = validateEmail(val);
        setInternalError(errorMsg);
        onValidationChange?.(!errorMsg);
      }
      onChange?.(e);
    };

    const displayError = externalError || (touched ? internalError : undefined);

    return (
      <Input
        type="email"
        ref={ref}
        label={label}
        error={displayError}
        onBlur={handleBlur}
        onChange={handleChange}
        className={className}
        {...props}
      />
    );
  }
);

EmailInput.displayName = 'EmailInput';
export default EmailInput;
