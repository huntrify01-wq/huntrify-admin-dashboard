import React, { useState, forwardRef, useEffect, useRef } from 'react';
import PhoneInputLib, { isValidPhoneNumber, getCountryCallingCode } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { cn } from './Input';

interface PhoneInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
  className?: string;
  defaultCountry?: any;
}



const CustomCountrySelect = forwardRef(({ value, onChange, options, iconComponent: Icon }: any, ref: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedOption = options.find((o: any) => o.value === value) || options[0];

  const filteredOptions = options.filter((o: any) => {
    if (!o.value) return false;
    const matchLabel = o.label?.toLowerCase().includes(search.toLowerCase());
    let matchCode = false;
    try {
      matchCode = getCountryCallingCode(o.value).includes(search.replace('+', ''));
    } catch (e) {}
    return matchLabel || matchCode;
  });

  return (
    <div className="relative flex items-center h-full z-20" ref={containerRef}>
      <button
        type="button"
        className="flex items-center gap-1.5 pr-4 h-full outline-none group/btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-[22px] h-[16px] rounded-sm overflow-hidden flex items-center justify-center bg-border-main">
          {Icon && value ? <Icon country={value} label={selectedOption?.label} /> : null}
        </div>
        <i className={cn(
          "ri-arrow-down-s-line text-lg text-text-sec transition-transform", 
          isOpen && "rotate-180",
          "group-hover/btn:text-primary"
        )} />
      </button>

      {isOpen && (
        <div className="absolute top-[48px] left-0 w-[280px] max-h-[300px] flex flex-col bg-surface border border-border-main rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-top-2 overflow-hidden">
          <div className="p-2 border-b border-border-main">
            <div className="relative flex items-center w-full h-[36px] bg-bg border border-border-main rounded-lg px-3">
              <i className="ri-search-line text-text-sec mr-2" />
              <input
                autoFocus
                type="text"
                placeholder="Search country or code..."
                className="w-full h-full bg-transparent outline-none text-[13px] text-text-main"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1 p-1">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-[13px] text-text-sec">No results found</div>
            ) : (
              filteredOptions.map((opt: any) => {
                let code = "";
                try { code = getCountryCallingCode(opt.value); } catch(e) {}
                
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-left text-[13px] rounded-md transition-colors",
                      value === opt.value ? "bg-primary/10 text-primary font-medium" : "text-text-main hover:bg-bg"
                    )}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearch("");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-[20px] h-[14px] rounded-sm overflow-hidden flex items-center justify-center">
                        {Icon && <Icon country={opt.value} label={opt.label} />}
                      </div>
                      <span className="truncate max-w-[140px]">{opt.label}</span>
                    </div>
                    <span className="text-text-sec font-medium ml-2 shrink-0">+{code}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label = "Phone Number", value, onChange, className, defaultCountry = "US", ...props }, ref) => {
    const [internalValue, setInternalValue] = useState<string | undefined>(value);
    
    const currentValue = value !== undefined ? value : internalValue;
    const handleChange = (val: string | undefined) => {
      setInternalValue(val);
      onChange?.(val);
    };

    const isValid = currentValue ? isValidPhoneNumber(currentValue) : false;
    const isError = currentValue && currentValue.length > 5 ? !isValid : false;
    const hasValue = currentValue && currentValue.length > 0;
    
    const inputId = React.useId();

    return (
      <div className={cn("flex flex-col w-full group", className)}>
        <div className="relative w-full">
          <div className={cn(
            'flex items-center w-full h-[48px] bg-transparent border border-border-main rounded-[var(--radius-input)] px-3.5 text-[14px] text-text-main transition-colors',
            'group-focus-within:border-primary group-focus-within:ring-1 group-focus-within:ring-primary',
            'hover:border-text-main/30',
            isError && 'border-error hover:border-error',
            isValid && 'border-success hover:border-success'
          )}>
            <PhoneInputLib
              placeholder={label}
              value={currentValue}
              onChange={handleChange}
              defaultCountry={defaultCountry}
              countrySelectComponent={CustomCountrySelect}
              className="w-full flex items-center h-full outline-none phone-input-override pr-6"
              numberInputProps={{
                id: inputId,
                className: "w-full h-full bg-transparent outline-none border-none text-text-main placeholder-transparent focus:ring-0 focus:outline-none",
                placeholder: label
              }}
              {...props}
            />
            
            {isValid && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-success">
                <i className="ri-check-line text-lg" />
              </div>
            )}
          </div>
          
          {label && (
            <label 
              htmlFor={inputId}
              className={cn(
                "absolute px-1.5 bg-surface transition-all duration-200 pointer-events-none select-none rounded-full",
                // Floating state logic (if has value OR is focused within)
                hasValue 
                  ? "top-0 left-3 -translate-y-1/2 text-[11px] text-text-sec" 
                  : "top-1/2 left-[76px] -translate-y-1/2 text-[14px] text-text-sec",
                // Group focus overrides
                "group-focus-within:top-0 group-focus-within:left-3 group-focus-within:-translate-y-1/2 group-focus-within:text-[11px]",
                isError 
                  ? "group-focus-within:text-error" 
                  : isValid ? "group-focus-within:text-success" : "group-focus-within:text-primary",
                (isError && !hasValue) && "text-error",
                (isValid && !hasValue) && "text-success"
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {isError && (
           <span className="text-[11px] text-error mt-1 pl-1 truncate">
             <i className="ri-error-warning-line mr-1" /> Invalid phone number
           </span>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
export default PhoneInput;
